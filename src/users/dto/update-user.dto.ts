import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(2, 30, {
    message: 'имя пользователя должно содержать от двух до тридцати символов',
  })
  readonly username: string;

  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Введите пароль' })
  readonly password: string;

  @Length(2, 200, {
    message: 'Поле "Обо мне" должно иметь от двух до двухсот символов',
  })
  readonly about: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly avatar: string;
}
