import { IsDefined } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, JoinColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class Logfile extends BaseEntity {
/**
 * create a logfile to add to the database
 * @param user UserAccount
 * @param description string
 * @param ipAdress string
 * @returns Logfile
 */
  public static createLogFile(user: UserAccount, description: string, ipAdress: string) {
    const logFile = Logfile.create();
    logFile.account_id = user;
    logFile.description = description;
    logFile.ipaddress = ipAdress;
    return logFile;
  }

  public static createLogFile = (account: UserAccount, description: string, ipAdress: string) => {
    const log = Logfile.create();
    log.account_id = account
    log.description = description;
    log.ipaddress = ipAdress;
    return log;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserAccount, (account_id) => account_id.userId)
  @IsDefined()
  account_id: UserAccount;

  @CreateDateColumn({ name: "date" })
  date: Date

  @Column({ name: "description" })
  @IsDefined()
  description: string

  @Column({ name: "ipaddress" })
  ipaddress: string

}
