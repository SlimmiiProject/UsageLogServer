import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserAcount } from "./User";

@Entity()
export class Administrator extends BaseEntity {
  @PrimaryGeneratedColumn()
  adminId!: number;

  @OneToOne(() => UserAcount, { nullable: false, cascade: true })
  @JoinColumn({ name: "user" })
  user!: UserAcount;
}
