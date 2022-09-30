import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./Device";

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  dataId!: number;

  @ManyToOne(() => Device, (device) => device.data)
  device!: Device;

  @Column("int", { nullable: true })
  Day!: number;

  @Column("int", { nullable: true })
  Night!: number;
}
