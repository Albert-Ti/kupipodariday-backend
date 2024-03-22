import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserRequest } from 'src/types';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { WishesService } from 'src/wishes/wishes.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  async getMe(@Req() req: UserRequest) {
    return req.user;
  }

  @Get('me/wishes')
  async getMyWishes(@Req() req: UserRequest) {
    return await this.wishesService.findOwnWishes({ id: req.user.id });
  }

  @Patch('me')
  async updateMe(@Req() req: UserRequest, @Body() dto: UpdateUserDto) {
    return await this.userService.updateOne(req.user.id, dto);
  }

  @Get(':username/wishes')
  async getUsernameByWishes(@Param('username') username: string) {
    return [];
  }

  @Get(':username')
  async getUsername(@Param('username') username: string) {
    return await this.userService.findOne({ username });
  }

  @Post('find')
  async findMany(@Body() { query }) {
    return await this.userService.findMany(query);
  }
}
