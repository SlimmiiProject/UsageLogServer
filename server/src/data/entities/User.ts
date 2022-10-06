import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Device } from "./Device";

@Entity()
export class UserAcount extends BaseEntity {
  @PrimaryColumn("varchar", {
    unique: true,
    nullable: false,
    length: 25,
    name: "userid",
  })
  userId!: string;

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

  @Column("varchar", { nullable: false, unique: false, name: "password" })
  password!: string;

  @Column("varchar", {
    nullable: false,
    unique: true,
    length: 50,
    name: "email",
  })
  email!: string;

  @Column("varchar", { nullable: false, length: 11, unique: true })
  phone!: string;

  @OneToMany(() => Device, (device) => device.deviceId, {
    nullable: true
  })
  @JoinColumn({ name: "device" })
  device!: Device;
}
