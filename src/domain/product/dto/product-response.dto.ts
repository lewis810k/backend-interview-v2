export class ProductResponseDto {
  id: number;
  productName: string;
  brand: string;
  price: number;
  size: string;
  color: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
