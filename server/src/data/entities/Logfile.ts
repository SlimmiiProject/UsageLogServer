import { IsDefined, IsOptional, Length } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, JoinColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Data } from "./Data";
import { TemporaryData } from "./TemporaryData";
import { UserAccount } from "./UserAccount";

@Entity()
export class Logfile extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(()=> UserAccount, (account_id) => account_id.userId)
  @IsDefined()
  account_id: UserAccount;

  @CreateDateColumn({ name: "date" })
  date: Date

  @Column({name:"description"})
  @IsDefined()
  description: string

  @Column({name: "ipaddress"})
  ipaddress: string

}
