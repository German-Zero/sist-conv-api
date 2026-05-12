import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class PostBusinessDto {
  @IsString()
  name!: string;

  @IsString()
  address!: string;

  @Type(() => Number)
  @IsNumber()
  discount!: number;
}
