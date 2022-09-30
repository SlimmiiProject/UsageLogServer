import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAcount } from "./User";

@Entity()
export class Administrator {
  @PrimaryGeneratedColumn()
  adminId!: number;

  @OneToOne(() => UserAcount, (user) => user.userId)
  @JoinColumn()
  user!: UserAcount;
}
