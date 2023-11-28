import { Inject, Injectable } from '@nestjs/common';
import { AdvertService } from 'src/advert/advert.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class DatabaseConfigService {
  constructor(
    @Inject(AdvertService)
    private readonly advertService: AdvertService,
  ) {}
  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  createFixtureAdvert() {
    for (let i = 0; i < 10; i++) {
      this.advertService.create({
        title: faker.lorem.words(3),
        price: this.randomNumber(200, 5000),
        nb_rooms: this.randomNumber(1, 5),
        square_meters: this.randomNumber(9, 100),
        description: faker.lorem.paragraphs(5),
        phoneNumber: faker.phone.number(),
      });
    }

    return {
      message: 'Fixture created',
    };
  }
}
