import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Device } from "./Device";
import { Crypt } from "../../utils/Crypt";
import { AccountManager } from "../../accounts/AccountManager";
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  Length,
  MaxLength,
  MinLength,
} from "class-validator";

@Entity()
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "userId",
  })
  userId: number;

  @Column("varchar", {
    nullable: false,
    unique: false,
    name: "firstname",
    length: 30,
  })
  @IsDefined()
  @Length(3, 30)
  firstname: string;

  @Column("varchar", {
    nullable: false,
    unique: false,
    name: "lastname",
    length: 30,
  })
  @Length(3, 30)
  @IsDefined()
  lastname: string;

  @Column("text", { nullable: false, unique: false, name: "hashedPassword" })
  @MinLength(5)
  @IsDefined()
  password: string | undefined;

  @Column("varchar", {
    nullable: false,
    unique: true,
    length: 50,
    name: "email",
  })
  @IsEmail()
  @MaxLength(50)
  @IsDefined()
  email: string;

  @Column("varchar", { nullable: true, unique: false, length: 12 })
  @Length(12, 12)
  @IsPhoneNumber("BE")
  @IsOptional()
  phone: string;

  @OneToMany(() => Device, (device) => device.deviceId, {
    nullable: true,
  })
  @JoinColumn({ name: "device" })
  @IsOptional()
  device: Device[];

  @Column("varchar", { name: "day", nullable: true, unique: false, length: 20 })
  @IsOptional()
  colorDay: string;

  @Column("varchar", { name: "night", nullable: true, unique: false, length: 20 })
  @IsOptional()
  colorNight: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    return (
      this.password &&
      (await new Promise((resolve, reject) => {
        const hashedPassword = Crypt.encrypt(this.password);
        hashedPassword ? resolve((this.password = hashedPassword)) : reject(console.log("Hashing password failed"));
      }))
    );
  }

  isAdmin = async () => await AccountManager.isAdministrator(this.userId);
}
