import { IsNumber, IsUrl, Length } from 'class-validator';

export class CreateWishDto {
  @Length(1, 250, { message: 'Должно содержать от 1-го до 250-ти символов' })
  name: string;

  @IsUrl({}, { message: 'Должен быть ссылкой' })
  link: string;

  @IsUrl({}, { message: 'Должен быть ссылкой' })
  image: string;

  @IsNumber({ maxDecimalPlaces: 10 }, { message: 'Должна быть цифрой' })
  price: number;

  @Length(1, 1024, { message: 'Должно содержать от 1-го до 1024-х символов' })
  description: string;
}
