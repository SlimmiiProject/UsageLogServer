import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class Administrator extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  adminId: number;

  @OneToOne(() => UserAccount, { nullable: false, cascade: true })
  @JoinColumn({ name: "user" })
  user: UserAccount;
}
