import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Data } from "./Data";
import { UserAcount } from "./User";

@Entity()
export class Device extends BaseEntity {
  @PrimaryColumn("varchar", { unique: true, nullable: false, name: "deviceId" })
  deviceId!: string;

  @OneToMany(() => Data, (data) => data.dataId, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: "data" })
  data: Data[] | undefined;

  @Column("varchar", {
    nullable: true,
    length: 50,
    unique: false,
    name: "deviceAlias",
  })
  friendlyName!: string;

  @ManyToOne(() => UserAcount, (useracount) => useracount.device, {
    nullable: true,
  })
  user!: UserAcount;
}
