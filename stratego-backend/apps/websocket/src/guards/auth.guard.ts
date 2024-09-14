/* Authentication Guard */
import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@app/common/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /* Function to determine authentication */
  async canActivate(context: ExecutionContextHost): Promise<boolean> {
    // Get the request params
    const request = context.getArgs()[0];
    // Read token from request headers
    const token = this.extractTokenFromHeader(request);
    // If no token found throw Exception
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // Read user data from JWT token with JWT secret
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      // If token not valid throw Exception
      throw new UnauthorizedException();
    }
    return true;
  }

  /* Extract token from header */
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] =
      request.handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
