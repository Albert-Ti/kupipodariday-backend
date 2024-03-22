import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UserRequest } from 'src/types';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
@UseGuards(JwtAuthGuard)
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  async create(@Req() req: UserRequest, @Body() dto: CreateWishDto) {
    return await this.wishesService.create(req.user, dto);
  }

  @Post(':id/copy')
  async copy(@Req() req: UserRequest, @Param('id') wishId: number) {
    const { id, ...wish } = await this.wishesService.findOne({ id: wishId });
    await this.wishesService.updateOne({ id: wishId });
    return await this.wishesService.create(req.user, wish);
  }

  @Get('last')
  async getLast() {
    return await this.wishesService.findLast();
  }

  @Get('top')
  async getTop() {
    return await this.wishesService.findTop();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.wishesService.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: number, dto: UpdateWishDto) {
    return {};
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return {};
  }

  @Post(':id')
  async copyWish(@Param('id') id: number) {
    return {};
  }
}
