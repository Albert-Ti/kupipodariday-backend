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

@UseGuards(JwtAuthGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  async create(@Req() req: UserRequest, @Body() dto: CreateWishDto) {
    return await this.wishesService.create(req.user, dto);
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
    return await this.wishesService.findOne({
      where: { id },
      relations: { owner: true, offers: { user: true } },
      order: { createdAt: 'DESC' },
    });
  }

  @Patch(':id')
  async update(
    @Req() req: UserRequest,
    @Body() dto: UpdateWishDto,
    @Param('id') id: number,
  ) {
    return await this.wishesService.updateOne(req.user, { where: { id } }, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.wishesService.removeOne({ where: { id } });
  }

  @Post(':id/copy')
  async copy(@Req() req: UserRequest, @Param('id') id: number) {
    return await this.wishesService.copy(req.user, {
      where: { id },
      relations: { owner: true },
    });
  }
}
