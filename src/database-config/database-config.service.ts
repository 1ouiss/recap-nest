import { Inject, Injectable } from '@nestjs/common';
import { AdvertService } from 'src/advert/advert.service';
import { faker } from '@faker-js/faker';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DatabaseConfigService {
  constructor(
    @Inject(AdvertService)
    private readonly advertService: AdvertService,
    private readonly userService: UserService,
  ) {}
  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  async createFixtureAdvert() {
    const users = await this.userService.findAll({
      query: '',
      order: 'ASC',
      order_by: 'createdAt',
    });

    for (let i = 0; i < 2; i++) {
      this.advertService.create({
        title: faker.lorem.words(3),
        price: this.randomNumber(200, 5000),
        nb_rooms: this.randomNumber(1, 5),
        square_meters: this.randomNumber(9, 100),
        description: faker.lorem.paragraphs(5),
        phoneNumber: faker.phone.number(),
        user: users[this.randomNumber(0, users.length)],
      });
    }

    return {
      message: 'Fixture created',
    };
  }

  createFixtureUser() {
    for (let i = 0; i < 10; i++) {
      this.userService.create({
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
      });
    }
    return {
      message: 'Fixture created',
    };
  }
}
