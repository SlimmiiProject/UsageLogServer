import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Device } from "./Device";

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
  hashed_password: string | undefined;

  @Column("varchar", {
    nullable: false,
    unique: true,
    length: 50,
    name: "email",
  })
  email: string;

  @Column("numeric", { nullable: false, unique: true })
  phone: number;

  @OneToMany(() => Device, (device) => device.deviceId, {
    nullable: true,
  })
  @JoinColumn({ name: "device" })
  device: Device[];
}
