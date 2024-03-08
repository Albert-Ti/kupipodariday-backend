import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFilter } from 'src/types';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.find({ where: dto });
    if (user) {
      throw new BadRequestException('Пользователь уже существует');
    }
    return await this.userRepository.save(dto);
  }

  async findOne(query: QueryFilter<User>) {
    const user = await this.userRepository.findOne({
      where: query,
      select: { password: false },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async updateOne(query: QueryFilter<User>, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: query });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  async removeOne(query) {
    return this.userRepository.delete(query);
  }
}
