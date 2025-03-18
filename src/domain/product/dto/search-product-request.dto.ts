import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaginationQuery } from '../../../libs/dto/pagination.query';

export class SearchProductRequestDto extends PaginationQuery {
  @IsOptional()
  @IsString()
  readonly productName?: string;

  @IsOptional()
  @IsString()
  readonly brand?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly minPrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly maxPrice?: number;

  @IsOptional()
  @IsString()
  readonly productSize?: string;

  @IsOptional()
  @IsString()
  readonly color?: string;

  @IsOptional()
  @IsEnum(['id', 'productName', 'price'])
  readonly sortBy?: 'id' | 'productName' | 'price';
}
