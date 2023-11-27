import { Module } from '@nestjs/common';
import { AdvertService } from './advert.service';
import { AdvertController } from './advert.controller';
import { Advert } from './entities/advert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AdvertController],
  providers: [AdvertService],
  imports: [TypeOrmModule.forFeature([Advert])],
})
export class AdvertModule {}
