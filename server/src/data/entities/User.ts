import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class UserAcount extends BaseEntity  {


  @PrimaryColumn("varchar", { unique: true, nullable: false, length: 25 })
  userId!: string;

  @Column("varchar", { nullable: false, unique: false })
  password!: string;

  @Column("varchar", { nullable: false, unique: true, length: 60 })
  email!: string;

  @Column("varchar", { nullable: false, length: 11, unique: true })
  phone!: string;

}
