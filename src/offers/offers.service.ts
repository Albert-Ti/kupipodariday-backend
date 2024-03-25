import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offers.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(user: User, dto: CreateOfferDto) {
    const offer = this.offerRepository.create(dto);
    const wish = await this.wishesService.findOne({
      where: { id: dto.itemId },
    });

    offer.item = wish;
    offer.user = dto.hidden
      ? { ...user, avatar: '', username: 'anonyms' }
      : user;

    return await this.offerRepository.save(offer);
  }

  async findOne(query: FindOptionsWhere<Offer>) {
    return await this.offerRepository.findOne({ where: query });
  }

  async findAll() {
    return await this.offerRepository.find();
  }
}
