import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

UseGuards(JwtAuthGuard);
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  async create(@Body() dto: CreateWishlistDto) {
    console.log(dto);
  }

  @Get()
  async findAll() {
    return await this.wishlistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {}

  @Patch(':id')
  async update(@Param('id') id: number) {}

  @Delete(':id')
  async remove(@Param('id') id: number) {}
}
