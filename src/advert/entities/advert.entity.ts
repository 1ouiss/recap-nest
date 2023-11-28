import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Advert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'float',
    default: 0,
  })
  price: number;

  @Column()
  description: string;

  @Column()
  nb_rooms: number;

  @Column()
  square_meters: number;

  @Column({
    nullable: true,
  })
  formatted_address: string;

  @Column({
    nullable: true,
  })
  street_number: number;

  @Column({
    nullable: true,
  })
  route: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  administrative_area_level_1: string;

  @Column({
    nullable: true,
  })
  administrative_area_level_2: string;

  @Column({
    nullable: true,
  })
  country: string;

  @Column({
    nullable: true,
  })
  postal_code: number;

  @Column({
    nullable: true,
  })
  lat: number;

  @Column({
    nullable: true,
  })
  lng: number;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.adverts)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
