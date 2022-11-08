import { IsEmail, Length, MaxLength, IsDefined } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ContactForm extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "contactId",
  })
  contactId: number;

  @Column("varchar", {
    nullable: false,
    unique: false,
    name: "topic",
    length: 100,
  })
  @Length(4, 100)
  @IsDefined()
  message_topic: string;

  @Column("varchar", {
    nullable: false,
    unique: false,
    length: 50,
    name: "email",
  })
  @MaxLength(50)
  @IsDefined()
  @IsEmail()
  email: string;

  @Column("text", {
    nullable: false,
    unique: false,
    name: "message",
  })
  @IsDefined()
  @MaxLength(1000)
  message: string;

  @Column("varchar", {
    nullable: false,
    unique: false,
    name: "name",
  })
  @MaxLength(20)
  name: string;

  @Column("varchar", {
    nullable: false,
    name: "lastname",
    unique: false,
  })
  @MaxLength(20)
  lastname: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
