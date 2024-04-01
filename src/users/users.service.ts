import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const { password, ...result } = await this.userRepository.save({
      ...dto,
      password: await this.hash(dto.password),
    });
    return result;
  }

  async findOne(query: FindOneOptions) {
    return await this.userRepository.findOne(query);
  }

  async findMany(query: FindManyOptions) {
    return await this.userRepository.find(query);
  }

  async updateOne(id: number, dto: UpdateUserDto) {
    if (dto.password) {
      return await this.userRepository.update(id, {
        ...dto,
        password: await this.hash(dto.password),
      });
    }
    return await this.userRepository.update(id, dto);
  }

  async hash(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
