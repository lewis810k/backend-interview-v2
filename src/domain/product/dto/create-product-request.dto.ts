import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductRequestDto {
  @IsString()
  readonly productName: string;

  @IsString()
  readonly brand: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsString()
  readonly size: string;

  @IsString()
  readonly color: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
