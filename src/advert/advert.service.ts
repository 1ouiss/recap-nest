import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Advert } from './entities/advert.entity';
import { Repository } from 'typeorm';

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

  async findAll() {
    try {
      return await this.advertRepository.find({
        relations: ['user'],
      });
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
