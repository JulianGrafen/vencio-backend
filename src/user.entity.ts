import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn} from 'typeorm';
    
import Listing  from './listing.entity';
  


  @Entity()
  class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;

    @OneToMany(() => Listing, (listing) => listing.user)
    listings: Listing[];

    @Column({
      nullable: true,
    })
    mockAnzeigenPassword: string;

    @Column({
      nullable: true,
    })
    mockAnzeigenEmail: string;

    //TODO: add additional columns for all other partnersites
  }

  export default User;
  
