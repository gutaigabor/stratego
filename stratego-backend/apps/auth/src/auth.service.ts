/* Authentication Service */
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRequest } from './dto/create-user.request';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  /* Create user in database with hashed password */
  async createUser(request: UserRequest) {
    const hashedPasswrod = await bcrypt.hash(request.password, 12);

    try {
      const user = await this.authRepository.create({
        username: request.username,
        password: hashedPasswrod,
      });

      const payload = { sub: user._id, username: user.username };

      // Create JWT access token
      const access_token = await this.jwtService.signAsync(payload);

      return { userId: user._id, username: user.username, token: access_token };
    } catch (e) {
      throw new BadRequestException('User exists');
    }
  }

  /* User login */
  async login(request: UserRequest) {
    try {
      const user = await this.authRepository.findOne({
        username: { $eq: request.username },
      });

      // If user not found, throw Exception
      if (!user || !user._id) {
        throw new BadRequestException('User not found');
      }

      // If hashed password not equals DB password throw Exception
      if (!(await bcrypt.compare(request.password, user.password))) {
        throw new BadRequestException('Invalid credentials');
      }

      const payload = { sub: user._id, username: user.username };

      // Create JWT access token
      const access_token = await this.jwtService.signAsync(payload);

      return { userId: user._id, username: user.username, token: access_token };
    } catch (e) {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
