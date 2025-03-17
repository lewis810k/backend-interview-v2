import { Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { Product } from '../../libs/entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(dto: CreateProductRequestDto) {
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }
}
