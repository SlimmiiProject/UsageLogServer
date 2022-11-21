import { Device } from "./Device";
import { Crypt } from "../../utils/Crypt";
import { AccountManager } from "../../accounts/AccountManager";
import { Logger } from "../../utils/Logger";
import { IsDefined, Length, MinLength, IsEmail, MaxLength, IsPhoneNumber, IsOptional } from "class-validator";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm";
export enum GraphColors {
  RED = "red",
  GREEN = "green",
  ORANGE = "orange",
  YELLOW = "yellow",
  BLUE = "blue",
  PURPLE = "purple"
}
@Entity()
export class UserAccount extends BaseEntity {

  @PrimaryGeneratedColumn({ name: "userId" })
  userId: number;

  @Column("varchar", { nullable: false, unique: false, name: "firstname", length: 30 })
  @IsDefined()
  @Length(3, 30)
  firstname: string;

  @Column("varchar", { nullable: false, unique: false, name: "lastname", length: 30 })
  @Length(3, 30)
  @IsDefined()
  lastname: string;

  @Column("text", { nullable: false, unique: false, name: "hashedPassword" })
  @MinLength(5)
  @IsDefined()
  password: string;

  @Column("varchar", { nullable: false, unique: true, length: 50, name: "email" })
  @IsEmail()
  @MaxLength(50)
  @IsDefined()
  email: string;

  @Column("varchar", { nullable: true, unique: false, length: 12 })
  @Length(0, 13)
  @IsOptional()
  phone: string;

  @OneToMany(() => Device, (device) => device.deviceId, { nullable: true })
  @JoinColumn({ name: "device" })
  @IsOptional()
  device: Device[];

  @Column("enum", { enum: GraphColors, default: GraphColors.ORANGE, name: "color_day", nullable: true, unique: false })
  @IsOptional()
  colorDay: GraphColors;

  @Column("enum", { enum: GraphColors, default: GraphColors.PURPLE, name: "color_night", nullable: true, unique: false })
  @IsOptional()
  colorNight: GraphColors;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    return this.password && await new Promise((resolve, reject) => {
      const hashedPassword = Crypt.encrypt(this.password);
      hashedPassword ? resolve((this.password = hashedPassword)) : reject(Logger.error("Hashing password failed"))
    });
  }

  isAdmin = async () => await AccountManager.isAdministrator(this.userId);
}
