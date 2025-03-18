import { IsOptional } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  readonly offset?: number;

  @IsOptional()
  readonly size?: number;

  @IsOptional()
  readonly page?: number;

  @IsOptional()
  readonly sortBy?: string;
}
