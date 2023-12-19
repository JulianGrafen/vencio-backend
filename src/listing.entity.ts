import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import  User  from './user.entity';

@Entity()
 class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  objectId: string;

  @ManyToOne(() => User, (user) => user.listings)
  user: User;


}

export default Listing;
