import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PutBusinessDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  discount?: number;
}
