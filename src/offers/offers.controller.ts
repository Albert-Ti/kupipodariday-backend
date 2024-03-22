import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() dto: CreateOfferDto) {
    return this.offersService.create(dto);
  }

  @Get()
  async findAll() {}

  @Get(':id')
  async findOne(@Param('id') id: number) {}
}
