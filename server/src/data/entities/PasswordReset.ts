import { IsDefined } from "class-validator";
import { Entity, BaseEntity, PrimaryColumn, OneToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class PasswordReset extends BaseEntity {

  public static createPasswordReset = (user: UserAccount, token: string) => {
    const passwordReset = PasswordReset.create();
    passwordReset.user = user;
    passwordReset.token = token;
    return passwordReset;
  }

  @PrimaryColumn("varchar", { name: "token", unique: true, nullable: false })
  @IsDefined()
  token: string;

  @OneToOne(() => UserAccount, { nullable: false, cascade: true })
  @JoinColumn({ name: "user" })
  @IsDefined()
  user: UserAccount;

  @CreateDateColumn({ name: "created_at" })
  @IsDefined()
  created_at: Date;
}
