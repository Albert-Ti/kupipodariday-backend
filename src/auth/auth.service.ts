import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  async signin(dto: SigninDto) {
    try {
      const user = await this.userService.findOne({ email: dto.email });
      const matched = await bcrypt.compare(dto.password, user.password);

      if (!matched) {
        throw new UnauthorizedException('Неверная почта или пароль');
      }
      const payload = { sub: user.id };

      return {
        token: this.jwtService.sign(payload, {
          secret: process.env.SECRET_KEY,
        }),
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Неверная почта или пароль');
    }
  }
}
