import { IsDefined, IsInt, IsOptional } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Device } from "./Device";

@Entity()
export class TemporaryData extends BaseEntity {

  public static createTempData = (device: Device, day?: number, night?: number) => {
    const tempData = TemporaryData.create();
    tempData.device = device;
    tempData.Day = day;
    tempData.Night = night;
    return tempData;
  }

  @PrimaryGeneratedColumn({ name: "index" })
  index!: number;

  @ManyToOne(() => Device, (device) => device.device_index, { nullable: false })
  @IsDefined()
  device: Device;

  @Column("numeric", { name: "day", nullable: true, unique: false })
  @IsOptional()
  @IsInt()
  Day: number;

  @Column("numeric", { name: "night", nullable: true, unique: false })
  @IsOptional()
  @IsInt()
  Night: number;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  public add = (day: number, night: number) => {
    this.Day += day;
    this.Night += night;
  }
}
