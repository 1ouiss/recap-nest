import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Advert } from './entities/advert.entity';
import { Repository } from 'typeorm';
import { QueriesAdvertDto } from './dto/query-advert.dto';

@Injectable()
export class AdvertService {
  constructor(
    @InjectRepository(Advert)
    private readonly advertRepository: Repository<Advert>,
  ) {}
  async create(createAdvertDto: CreateAdvertDto) {
    try {
      const advert = await this.advertRepository.create(createAdvertDto);
      return await this.advertRepository.save(advert);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(queries: QueriesAdvertDto) {
    const {
      max_price,
      min_price,
      order = 'DESC',
      order_by = 'price',
      min_nb_rooms,
      max_nb_rooms,
      min_square_meters,
      max_square_meters,
      name,
    } = queries;

    try {
      const query = await this.advertRepository
        .createQueryBuilder('advert')
        .leftJoinAndSelect('advert.user', 'user');

      if (name) {
        query.andWhere('user.name like :name', {
          name: `%${name}%`,
        });
      }

      if (max_price) {
        query.andWhere('advert.price <= :max_price', { max_price });
      }

      if (min_price) {
        query.andWhere('advert.price >= :min_price', { min_price });
      }

      if (min_nb_rooms) {
        query.andWhere('advert.nb_rooms >= :min_nb_rooms', { min_nb_rooms });
      }

      if (max_nb_rooms) {
        query.andWhere('advert.nb_rooms <= :max_nb_rooms', { max_nb_rooms });
      }

      if (min_square_meters) {
        query.andWhere('advert.square_meters >= :min_square_meters', {
          min_square_meters,
        });
      }

      if (max_square_meters) {
        query.andWhere('advert.square_meters <= :max_square_meters', {
          max_square_meters,
        });
      }

      query.orderBy(`advert.${order_by}`, order);

      const advertsList = query.getMany();
      return advertsList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const advert = await this.advertRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!advert)
        return new HttpException('Advert not found', HttpStatus.NOT_FOUND);
      return advert;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateAdvertDto: UpdateAdvertDto) {
    await this.findOne(id);
    try {
      const advert = await this.advertRepository.update(id, updateAdvertDto);
      return advert;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    const advert = await this.findOne(id);
    return this.advertRepository.softRemove(advert as any);
  }
}
