export class SearchProductRequestDto {
  readonly productName?: string;
  readonly brand?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly productSize?: string;
  readonly color?: string;
  readonly offset?: number = 0;
  readonly size?: number = 10;
  readonly page?: number = 1;
  readonly sortBy?: string;
}
