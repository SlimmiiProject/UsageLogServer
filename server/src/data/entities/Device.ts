import { IsDefined, IsOptional, Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Data } from "./Data";
import { TemporaryData } from "./TemporaryData";
import { UserAccount } from "./UserAccount";

@Entity()
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  device_index!: number;

  @PrimaryColumn("varchar", {
    nullable: false,
    name: "deviceId",
    unique: true,
    length: 64,
  })
  @IsDefined()
  @Length(64, 64)
  deviceId!: string;

  @OneToMany(() => Data, (data) => data.dataId, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: "data" })
  data!: Data[];

  @Column("varchar", {
    nullable: true,
    length: 50,
    unique: false,
    name: "deviceAlias",
  })
  @IsOptional()
  @Length(1, 50)
  friendlyName!: string;

  @ManyToOne(() => UserAccount, (useracount) => useracount.device, {
    nullable: true,
    cascade: true,
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "userId",
  })
  user!: UserAccount;

  @OneToMany(() => TemporaryData, (tempData) => tempData.device, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: "temporary_data" })
  temporary_data: TemporaryData[];
}
