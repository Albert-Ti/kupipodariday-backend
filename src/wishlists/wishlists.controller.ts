import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  async create(@Body() dto: CreateWishlistDto) {}

  @Get()
  async findAll() {}

  @Get(':id')
  async findOne(@Param('id') id: number) {}

  @Patch(':id')
  async update(@Param('id') id: number) {}

  @Delete(':id')
  async remove(@Param('id') id: number) {}
}
