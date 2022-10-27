import { IsDefined, IsInt, IsNumberString, IsOptional } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
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
  @IsDefined()
  device: Device;

  @Column("numeric", {
    nullable: true,
    unique: false,
    unsigned: true,
    name: "day",
  })
  @IsOptional()
  @IsNumberString()
  Day: number;

  @Column("numeric", {
    nullable: true,
    unique: false,
    unsigned: true,
    name: "night",
  })
  @IsOptional()
  @IsNumberString()
  Night: number;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
