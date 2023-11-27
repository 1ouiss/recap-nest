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
  adress: string;
  @Column()
  title: string;
  // @Column()
  // state: boolean;
  @ManyToOne(() => User, (user) => user.adverts)
  user: User;
  // @Column()
  // dpe: string;
  // @Column()
  // gse: string;
  // @Column()
  // price: number;
  // @Column()
  // size: number;
  // @Column()
  // surface: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
