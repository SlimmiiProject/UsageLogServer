import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "contactId",
  })
  userId: number;

  @Column("varchar", {
    nullable: true,
    unique: false,
    length: 20,
    name: "name",
  })
  name: string;

  @Column("varchar", {
    nullable: false,
    unique: false,
    length: 50,
    name: "email",
  })
  email: string;

  @Column("text", {
    nullable: false,
    unique: false,
    name: "message",
  })
  message: string;
}
