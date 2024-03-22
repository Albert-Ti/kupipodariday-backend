import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { Wish } from './entities/wishes.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(owner: User, dto: CreateWishDto) {
    return await this.wishRepository.save({ ...dto, owner });
  }

  async copy() {}

  async findOne(query: FindOptionsWhere<Wish>) {
    return this.wishRepository.findOne({
      where: query,
      relations: { offers: true, owner: true },
    });
  }

  async findOwnWishes(query) {
    return this.wishRepository.find({
      where: { owner: query },
      order: { createdAt: 'DESC' },
    });
  }

  async findLast() {
    try {
      return await this.wishRepository.find({
        order: { createdAt: 'DESC' },
        take: 40,
      });
    } catch (error) {
      throw new NotFoundException('Список последних подарков не найден');
    }
  }

  async findTop() {
    try {
      return await this.wishRepository.find({
        order: { copied: 'DESC' },
        take: 20,
      });
    } catch (error) {
      throw new NotFoundException('Список популярных подарков не найден');
    }
  }

  async updateOne(query) {
    return await this.wishRepository.update(query, { copied: +1 });
  }

  async removeOne(query) {}
}
