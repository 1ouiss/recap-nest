import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueriesUserDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(queries: QueriesUserDto) {
    const { name, order = 'ASC', order_by = 'createdAt' } = queries;

    try {
      const query = await this.userRepository.createQueryBuilder('user');

      if (name) {
        query.andWhere('user.name like :name', { name: `%${name}%` });
      }

      query
        .orderBy(`user.${order_by}`, order)
        .leftJoinAndSelect('user.adverts', 'advert');

      const usersList = await query.getMany();
      return usersList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['advert'],
      });
      if (!user)
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.softRemove(user as any);
  }
}
