export class CreateProductRequestDto {
  readonly productName: string;
  readonly brand: string;
  readonly price: number;
  readonly size: string;
  readonly color: string;
  readonly description?: string;
}
