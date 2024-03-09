import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(2, 30, {
    message: 'имя пользователя должно содержать от двух до тридцати символов',
  })
  readonly username: string;

  @IsOptional()
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsOptional()
  @Length(4, 16, {
    message: 'Пароль должен содержать от 4-х до 16-ти символов',
  })
  readonly password: string;

  @IsOptional()
  @Length(2, 200, {
    message: 'Поле "Обо мне" должно иметь от двух до двухсот символов',
  })
  readonly about: string;

  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly avatar: string;
}
