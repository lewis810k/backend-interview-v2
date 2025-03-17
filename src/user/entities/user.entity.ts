import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  loginId: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
