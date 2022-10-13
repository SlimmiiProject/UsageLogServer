import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Translations extends BaseEntity {

  @PrimaryColumn("varchar", { nullable: false, length: 2, unique: true })
  lang_key: string;

  @Column("varchar", {length: 15})
  nativeName:string;

  @Column("longtext")
  translations: string;
}
