import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  async create(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  async find(dto: FindUserDto) {
    return await this.userService.find(dto);
  }
}
