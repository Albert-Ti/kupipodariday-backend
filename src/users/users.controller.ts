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
    private readonly usersService: UsersService,
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
    return await this.usersService.updateOne({ id: req.user.id }, dto);
  }
  /*
  (@Param('username') username: string) - ругался и выдавал ошибку (500), решалось если username назначить типом number, поэтому описал по другому.
  */

  @Get(':username/wishes')
  async getUsernameByWishes(@Param() params: { username: string }) {
    return await this.wishesService.findMany({ where: { owner: params } });
  }

  @Get(':username')
  async getUsername(@Param() params: { username: string }) {
    return await this.usersService.findOne({
      where: params,
      select: { password: false },
    });
  }

  @Post('find')
  async findMany(@Body() { query }) {
    return await this.usersService.findMany(query);
  }
}
