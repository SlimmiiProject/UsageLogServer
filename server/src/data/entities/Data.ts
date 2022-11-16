import { IsDefined, IsInt, IsOptional } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Device } from "./Device";

@Entity()
export class Data extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "dataid" })
  dataId: number;

  @ManyToOne(() => Device, (device) => device.data, { nullable: false })
  @IsDefined()
  device: Device;

  @Column("numeric", { nullable: true, unique: false, unsigned: false, name: "day" })
  @IsOptional()
  @IsInt()
  Day: number;

  @Column("numeric", { nullable: true, unique: false, unsigned: false, name: "night" })
  @IsOptional()
  @IsInt()
  Night: number;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}