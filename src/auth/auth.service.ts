import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  async signin(dto: FindUserDto) {
    return this.userService.find(dto);
  }
}
