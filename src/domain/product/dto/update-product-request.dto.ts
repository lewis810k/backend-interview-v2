import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductRequestDto {
  id: number;

  @IsOptional()
  @IsString()
  readonly productName?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly price?: number;

  @IsOptional()
  @IsString()
  readonly size?: string;

  @IsOptional()
  @IsString()
  readonly color?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
