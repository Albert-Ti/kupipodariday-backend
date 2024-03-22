import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save({ ...dto, password: hash });
    const { password, ...result } = user;
    return result;
  }

  async findOne(query: FindOptionsWhere<User>) {
    try {
      return await this.userRepository.findOne({
        where: query,
        select: { password: false },
      });
    } catch (error) {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async findMany(query: string) {
    const users = await this.userRepository.find({
      where: [{ email: query }, { username: query }],
      select: { password: false },
    });

    return users;
  }

  async updateOne(query: number, dto: UpdateUserDto) {
    try {
      const user = await this.userRepository.preload({ id: query, ...dto });
      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async removeOne(query: string | number) {
    const user = await this.userRepository.delete(query);
    if (!user.affected) {
      throw new NotFoundException('Пользователь не найден');
    }
    return { message: 'Успешное удаление' };
  }
}
