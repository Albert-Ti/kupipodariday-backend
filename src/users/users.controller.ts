import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    return await this.userService.create(createUser);
  }

  @Get('find')
  async find(@Body() query) {
    return await this.userService.findOne(query);
  }

  @Patch('me')
  async update(@Body() query, @Body() updateUser: UpdateUserDto) {
    return await this.userService.updateOne(query, updateUser);
  }

  @Delete()
  async remove(@Body() query) {
    return await this.userService.removeOne(query);
  }
}
