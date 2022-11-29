import { IsDefined } from "class-validator";
import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class Administrator extends BaseEntity {

  @PrimaryGeneratedColumn()
  adminId: number;

  @OneToOne(() => UserAccount, (user) => user.userId, { 
    nullable: false,
  onDelete: "CASCADE"  })
  @JoinColumn({ name: "user" })
  @IsDefined()
  user: UserAccount;
}