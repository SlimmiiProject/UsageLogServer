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
export class Password_Reset extends BaseEntity {
  @PrimaryColumn("varchar", { name: "token", unique: true, nullable: false })
  Token: string;

  @OneToOne(() => UserAccount, { nullable: false, cascade: false })
  @JoinColumn({ name: "user" })
  user: UserAccount;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
