import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Data } from "./Data";
import { UserAcount } from "./User";

@Entity()
export class Device {
  @PrimaryColumn()
  deviceId!: string;

  @OneToMany(() => Data, (data) => data.dataId)
  data!: Data[];

  @OneToOne(() => UserAcount, (user) => user.userId)
  @JoinColumn()
  user!: UserAcount;
}
