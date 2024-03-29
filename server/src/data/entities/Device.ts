import { IsDefined, IsInt, IsOptional, Length } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, JoinColumn, Column, ManyToOne, Equal } from "typeorm";
import { Data } from "./Data";
import { TemporaryData } from "./TemporaryData";
import { UserAccount } from "./UserAccount";

@Entity()
export class Device extends BaseEntity {

  public static createDevice = (deviceId: string, friendlyName?: string) => {
    const deviceExists = Device.findOne({ 
      where: {
        deviceId: Equal(deviceId)
      }
      });
    if (!deviceExists) {
    const device: Device = new Device();
    device.deviceId = deviceId;
    if (friendlyName) device.setFriendlyName(friendlyName);
    return device;
    }
  }

  @PrimaryGeneratedColumn({ name: "device_index" })
  device_index: number;

  @Column("varchar", { nullable: false, name: "deviceId", unique: true, length: 64 })
  @IsDefined()
  @Length(64, 64)
  deviceId: string;

  @OneToMany(() => Data, (data) => data.dataId, { nullable: true })
  @JoinColumn({ name: "data" })
  data: Data[];

  @Column("varchar", { nullable: true, length: 50, unique: false, name: "deviceAlias" })
  @IsOptional()
  @Length(1, 50)
  friendlyName: string;

  @ManyToOne(() => UserAccount, (useracount) => useracount.device, { nullable: true, cascade: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserAccount;

  @OneToMany(() => TemporaryData, (tempData) => tempData.device, { nullable: true, cascade: true })
  @JoinColumn({ name: "temporary_data" })
  temporary_data: TemporaryData[];

  @Column("numeric", { nullable: true, unique: false, name: "batteryPercentage" })
  @IsOptional()
  @IsInt()
  BatteryPercentage: number = 0;

  @Column("numeric", {name: "oldDay", default: 0})
  @IsInt()
  OldDay: number;

  @Column("numeric", {name: "oldNight", default: 0})
  @IsInt()
  OldNight: number;

  public setFriendlyName = (alias: string) => {
    this.friendlyName = alias;
    return this;
  };

  public setBatteryPercentage = (percentage: number) => {
    this.BatteryPercentage = percentage;
    return this;
  };
}
