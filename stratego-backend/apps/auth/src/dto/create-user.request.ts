/* Create User Request DTO*/
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRequest {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
