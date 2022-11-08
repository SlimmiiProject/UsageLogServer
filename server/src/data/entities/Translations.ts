import { IsDefined, Length, MaxLength } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Translations extends BaseEntity {
  @PrimaryColumn("varchar", { nullable: false, length: 2, unique: true })
  @Length(2, 2)
  @IsDefined()
  lang_key: string;

  @Column("varchar", { length: 15 })
  @MaxLength(15)
  @IsDefined()
  nativeName: string;

  @Column("longtext")
  translations: string;
}
