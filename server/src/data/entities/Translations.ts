import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Translations {
  @PrimaryColumn("varchar", { nullable: false, length: 2, unique: true })
  lang_key!: string;

  @Column("longtext")
  text!: string;
}
