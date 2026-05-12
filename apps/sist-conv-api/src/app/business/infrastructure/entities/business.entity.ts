import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";

@Entity('businesses')
export class Business extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  discount!: number;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column({ nullable: true })
  logoPublicId?: string;
}
