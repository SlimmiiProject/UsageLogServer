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
    length: 20,
    name: "topic",
  })
  @Index()
  message_topic: string;

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

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
