import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserAcount {
  @PrimaryColumn("varchar", { unique: true, nullable: false, length: 20 })
  userId!: string;

  @Column("varchar", { nullable: false, unique: false })
  password!: string;

  @Column("varchar", { nullable: false, unique: true })
  email!: string;

  @Column("varchar", { nullable: false, length: 11, unique: true })
  phone!: string;
}
