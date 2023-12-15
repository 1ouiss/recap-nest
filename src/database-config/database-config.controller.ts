import { Controller, Post } from '@nestjs/common';
import { DatabaseConfigService } from './database-config.service';

@Controller('fixtures')
export class DatabaseConfigController {
  constructor(private readonly databaseConfigService: DatabaseConfigService) {}

  @Post('adverts')
  createFixtureAdvert() {
    this.databaseConfigService.createFixtureAdvert();
  }

  @Post('users')
  createFixtureUser() {
    this.databaseConfigService.createFixtureUser();
  }
}
