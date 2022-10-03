import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn
} from "typeorm";
import { Data } from "./Data";
import { UserAcount } from "./User";

@Entity()
export class Device extends BaseEntity  {

  @PrimaryColumn("varchar", { unique: true, nullable: false })
  deviceId!: string;

  @OneToMany(() => Data, (data) => data.dataId, { nullable: true })
  data: Data[] | undefined;

  @OneToOne(() => UserAcount, (user) => user.userId, { nullable: false })
  @JoinColumn()
  user!: UserAcount;
}
