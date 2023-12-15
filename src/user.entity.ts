import {
    Column,
    Entity,
    PrimaryGeneratedColumn} from 'typeorm';
  
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