import { User } from 'src/user/entities/user.entity';

export class CreateAdvertDto {
  title: string;
  price: number;
  nb_rooms: number;
  square_meters: number;
  description: string;
  formatted_address?: string;
  street_number?: number;
  route?: string;
  city?: string;
  administrative_area_level_1?: string;
  administrative_area_level_2?: string;
  country?: string;
  postal_code?: number;
  lat?: number;
  lng?: number;
  phoneNumber: string;
  user: User;
}
