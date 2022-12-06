import { IsEmail, Length, MaxLength, IsDefined } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class ContactForm extends BaseEntity {

  public static createContactForm = (firstName: string, lastName: string, email: string, topic: string, message: string) => {
    const form: ContactForm = ContactForm.create();
    form.firstname = firstName;
    form.lastname = lastName;
    form.email = email;
    form.message_topic = topic;
    form.message = message;
    return form;
  }

  @PrimaryGeneratedColumn({ name: "contactId" })
  contactId: number;

  @Column("varchar", { nullable: false, unique: false, name: "topic", length: 100 })
  @Length(1, 100)
  @IsDefined()
  message_topic: string;

  @Column("varchar", { nullable: false, unique: false, length: 50, name: "email" })
  @MaxLength(50)
  @IsDefined()
  @IsEmail()
  email: string;

  @Column("text", { nullable: false, unique: false, name: "message" })
  @IsDefined()
  @MaxLength(1000)
  message: string;

  @Column("varchar", { nullable: false, unique: false, name: "firstname" })
  @IsDefined()
  @MaxLength(20)
  firstname: string;

  @Column("varchar", { nullable: false, name: "lastname", unique: false })
  @IsDefined()
  @MaxLength(20)
  lastname: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}