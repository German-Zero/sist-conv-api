import { Type } from "class-transformer"
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class PutUserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  lastname?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  dni?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  legajo?: number

  @IsOptional()
  @IsString()
  career?: string
}
