import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { Product } from '../../libs/entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductRequestDto } from './dto/update-product-request.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(
    dto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }

  async update(dto: UpdateProductRequestDto): Promise<ProductResponseDto> {
    const product = await this.findOneOrFail(dto.id);

    product.productName = dto.productName ?? product.productName;
    product.price = dto.price ?? product.price;
    product.size = dto.size ?? product.size;
    product.color = dto.color ?? product.color;
    product.description = dto.description ?? product.description;
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    const product = await this.findOneOrFail(id);
    await this.productRepository.delete(product.id);
  }

  async findOneOrFail(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException('상품을 찾을 수 없습니다.');
    }
    return product;
  }
}
