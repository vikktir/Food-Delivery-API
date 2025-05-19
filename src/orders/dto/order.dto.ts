import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  costumerName: string;

  @IsArray()
  @IsString({ each: true })
  items: string[];

  @IsString()
  @MinLength(5)
  address: string;

  @IsNumber()
  @IsPositive()
  totalAmount: number;
}
