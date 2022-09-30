import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserAcount {
  @PrimaryColumn()
  userId!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;
}
