import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Device } from "./Device";

@Entity()
export class Data extends BaseEntity {
  
  @PrimaryGeneratedColumn({ name: "dataid" })
  dataId: number;

  @ManyToOne(() => Device, (device) => device.data, { nullable: false })
  device: Device;

  @Column("numeric", {
    nullable: true,
    unique: false,
    unsigned: true,
    name: "day",
  })
  Day: number;

  @Column("numeric", {
    nullable: true,
    unique: false,
    unsigned: true,
    name: "night",
  })
  Night: number;
}
