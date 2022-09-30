import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./Device";

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  dataId!: number;

  @ManyToOne(() => Device, (device) => device.data, { nullable: false })
  device!: Device;

  @Column("int", { nullable: true, unique: false, unsigned: true })
  Day!: number;

  @Column("int", { nullable: true, unique: false, unsigned: true })
  Night!: number;
}
