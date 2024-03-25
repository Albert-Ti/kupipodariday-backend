import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 30, {
    message: 'Должно содержать от 2-х до 30-ти символов',
  })
  readonly username: string;

  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @Length(4, 16, {
    message: 'Пароль должен содержать от 4-х до 20-ти символов',
  })
  readonly password: string;

  @IsOptional()
  @Length(2, 200, {
    message: 'Должно иметь от 2-х до 200-х символов',
  })
  readonly about: string;

  @IsOptional()
  @IsUrl({}, { message: 'Должен быть ссылкой' })
  readonly avatar: string;
}
