import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
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

  async findOne(query: FindOneOptions) {
    return await this.userRepository.findOne(query);
  }

  async findMany(query: string) {
    return await this.userRepository.find({
      where: [{ email: query }, { username: query }],
      select: { password: false },
    });
  }

  async updateOne(query: FindOptionsWhere<User>, dto: UpdateUserDto) {
    return await this.userRepository.update(query, dto);
  }
}
