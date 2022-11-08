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
    unsigned: false,
    name: "day",
  })
  @IsOptional()
  @IsInt()
  Day: number;

  @Column("numeric", {
    nullable: true,
    unique: false,
    unsigned: false,
    name: "night",
  })
  @IsOptional()
  @IsInt()
  Night: number;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
