export class UpdateProductRequestDto {
  id: number;
  readonly productName?: string;
  readonly price?: number;
  readonly size?: string;
  readonly color?: string;
  readonly description?: string;
}
