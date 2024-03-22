import { IsNotEmpty, IsOptional } from 'class-validator';

export class SigninDto {
  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
