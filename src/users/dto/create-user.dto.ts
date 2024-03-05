import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Введите имя' })
  @Length(2, 30, { message: 'Некорректное имя пользователя' })
  readonly username: string;

  @Length(2, 200, {
    message: 'Поле "Обо мне" должно иметь от двух до двухсот символов',
  })
  readonly about: string;

  @IsString()
  readonly avatar: string;

  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Введите пароль' })
  readonly password: string;
}
