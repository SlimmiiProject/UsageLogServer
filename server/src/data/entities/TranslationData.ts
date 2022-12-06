import { IsDefined } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, JoinColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class TranslationData extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "nativeName" })
    nativeName: string;

    @Column({ name: "languageKey" })
    languageKey:string;

    @Column({ name: "render"})
    shouldRender:boolean;
}
