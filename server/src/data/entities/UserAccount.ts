import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Device } from "./Device";
import { Crypt } from "../../utils/Crypt";
import { AccountManager } from "../../accounts/AccountManager";

@Entity()
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "userId",
  })
  userId: number;

  @Column("varchar", {
    nullable: false,
    unique: false,
    name: "firstname",
    length: 30,
  })
  firstname: string;

  @Column("varchar", {
    nullable: false,
    unique: false,
    name: "lastname",
    length: 30,
  })
  lastname: string;

  @Column("text", { nullable: true, unique: false, name: "hashedPassword" })
  password: string | undefined;

  @Column("varchar", {
    nullable: false,
    unique: true,
    length: 50,
    name: "email",
  })
  email: string;

  @Column("varchar", { nullable: true, unique: false, length: 12 })
  phone: string;

  @OneToMany(() => Device, (device) => device.deviceId, {
    nullable: true,
  })
  @JoinColumn({ name: "device" })
  device: Device[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    return (
      this.password &&
      (await new Promise((resolve, reject) => {
        const hashedPassword = Crypt.encrypt(this.password);
        hashedPassword
          ? resolve((this.password = hashedPassword))
          : reject(
              console.log("hashing password failed password: " + hashedPassword)
            );
      }))
    );
  }

  async isAdmin() {
    return await AccountManager.isAdministrator(this.userId); 
  }
}
