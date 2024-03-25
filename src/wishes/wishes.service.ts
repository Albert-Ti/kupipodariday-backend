import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wishes.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(owner: User, dto: CreateWishDto) {
    return await this.wishRepository.save({ ...dto, owner });
  }

  async findOne(query: FindOneOptions) {
    return this.wishRepository.findOne(query);
  }

  async findOwnWishes(query: FindOptionsWhere<Wish>) {
    return this.wishRepository.find({
      where: { owner: query },
      order: { createdAt: 'DESC' },
    });
  }

  async findLast() {
    return await this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  async findTop() {
    return await this.wishRepository.find({
      order: { copied: 'DESC' },
      take: 20,
    });
  }

  async findMany(query: FindManyOptions) {
    return await this.wishRepository.find(query);
  }

  async updateOne(query: FindOneOptions, dto: UpdateWishDto) {
    const wish = await this.findOne(query);
    return await this.wishRepository.update(wish, dto);
  }

  async removeOne(query: FindOneOptions) {
    const wish = await this.findOne(query);
    return await this.wishRepository.delete(wish);
  }

  async copy(owner: User, query: FindOneOptions) {
    const originalWish = await this.findOne(query);
    originalWish.copied += 1;
    await this.wishRepository.save(originalWish);

    const { id, createdAt, updatedAt, copied, ...copiedWish } =
      Object.assign(originalWish);

    return await this.create(owner, copiedWish);
  }
}
