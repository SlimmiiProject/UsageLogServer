import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./Device";

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  dataId!: number;

  @ManyToOne(() => Device, (device) => device.data)
  device!: Device;

  @Column()
  Day!: number;

  @Column()
  Night!: number;
}
