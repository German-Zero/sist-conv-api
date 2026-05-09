import { IsEmail, IsEnum, IsNumber, IsString } from "class-validator"
import { RoleEnum } from "../../common/enums/role.enum"
import { Type } from "class-transformer";

export class PostUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  lastname!: string;

  @Type(() => Number)
  @IsNumber()
  dni!: number;

  @Type(() => Number)
  @IsNumber()
  legajo!: number;

  @IsString()
  career!: string;

  @IsEnum(RoleEnum)
  userType!: RoleEnum;
}
