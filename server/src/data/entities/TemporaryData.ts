import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class TemporaryData extends BaseEntity {
  @PrimaryColumn({ name: "deviceId" })
  deviceId: string;

  @Column("numeric", { name: "day", nullable: true, unique: false })
  Day: number;

  @Column("numeric", { name: "night", nullable: true, unique: false })
  Night: number;
  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
