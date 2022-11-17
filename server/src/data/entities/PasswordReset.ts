import { IsDefined } from "class-validator";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class PasswordReset extends BaseEntity {
 
  @PrimaryColumn("varchar", { name: "token", unique: true, nullable: false })
  @IsDefined()
  token: string;

  @OneToOne(() => UserAccount, { nullable: false, cascade: true })
  @JoinColumn({ name: "user" })
  @IsDefined()
  user: UserAccount;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
