import { IsNumber, IsOptional, IsUrl, Length } from 'class-validator';

export class UpdateWishDto {
  @IsOptional()
  @Length(1, 250, { message: 'Должно содержать от 1-го до 250-ти символов' })
  name: string;

  @IsOptional()
  @IsUrl({}, { message: 'Должен быть ссылкой' })
  link: string;

  @IsOptional()
  @IsUrl({}, { message: 'Должен быть ссылкой' })
  image: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 10 }, { message: 'Должна быть цифрой' })
  price: number;

  @IsOptional()
  @Length(1, 1024, { message: 'Должно содержать от 1-го до 1024-х символов' })
  description: string;
}
