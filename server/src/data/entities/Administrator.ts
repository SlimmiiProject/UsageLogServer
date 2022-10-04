import { BaseEntity, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAcount } from "./User";

@Entity()
export class Administrator extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  adminId!: number;

  @OneToOne(() => UserAcount, { nullable: false })
  @JoinColumn()
  user!: UserAcount;
}
