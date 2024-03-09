import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRequest } from 'src/types';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Get('find')
  async find(@Body() query) {
    return await this.userService.findOne(query);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async update(@Req() req: UserRequest, @Body() dto: UpdateUserDto) {
    return await this.userService.updateOne(req.user.id, dto);
  }

  @Delete()
  async remove(@Body() query) {
    return await this.userService.removeOne(query);
  }
}
