import { User } from 'src/user/entities/user.entity';

export class CreateAdvertDto {
  title: string;
  adress: string;
  user: User;
}
