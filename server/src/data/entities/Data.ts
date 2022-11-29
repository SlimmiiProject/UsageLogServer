import { IsDefined, IsInt, IsOptional } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Device } from "./Device";

@Entity()
export class Data extends BaseEntity {

  public static createData = (device:Device, day?:number, night?:number) => {
    const data:Data = Data.create();
    data.device = device;
    data.Day = day;
    data.Night = night;
    return data;
  }

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

  public add = (day: number, night: number) => {
    this.Day += day;
    this.Night += night;
  }
}