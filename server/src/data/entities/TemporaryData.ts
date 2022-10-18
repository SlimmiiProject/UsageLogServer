import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Device } from "./Device";
@Entity()
export class TemporaryData extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "index" })
  index!: number;

  @ManyToOne(() => Device, (device) => device.device_index, { nullable: false })
  device: Device;

  @Column("numeric", { name: "day", nullable: true, unique: false })
  Day: number;

  @Column("numeric", { name: "night", nullable: true, unique: false })
  Night: number;
  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
