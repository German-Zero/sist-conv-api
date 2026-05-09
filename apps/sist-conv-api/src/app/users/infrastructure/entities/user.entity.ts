import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { RoleEnum } from "../../../common/enums/role.enum";

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string

  @Column()
  name!: string

  @Column()
  lastname!: string

  @Column()
  dni!: number

  @Column()
  legajo!: number

  @Column()
  career!: string

  @Column()
  password!: string

  @Column()
  passwordChanged!: boolean

  @Column({ type: 'enum', enum: RoleEnum })
  role!: RoleEnum;
}
