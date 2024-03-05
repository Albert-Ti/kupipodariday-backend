import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class FindUserDto {
  @IsNotEmpty({ message: 'Введите имя' })
  @Length(2, 30, { message: 'Некорректное имя пользователя' })
  readonly username?: string;

  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Введите пароль' })
  readonly password: string;
}
