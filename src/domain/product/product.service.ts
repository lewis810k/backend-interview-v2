import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { Product } from '../../libs/entities/product.entity';
import {
  FindConditions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductRequestDto } from './dto/update-product-request.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { SearchProductRequestDto } from './dto/search-product-request.dto';
import { IListResponse } from '../../libs/interfaces/response.interface';
import {
  findPagination,
  responsePagination,
} from '../../libs/helpers/pagination.helper';

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

  async get(id: number): Promise<ProductResponseDto> {
    return this.findOneOrFail(id);
  }

  async search(
    query: SearchProductRequestDto,
  ): Promise<IListResponse<ProductResponseDto>> {
    const [list, total] = await this.productRepository.findAndCount({
      where: {
        ...getTerms(query),
      },
      ...findPagination(query),
    });

    const pagination = responsePagination(total, list.length, query);
    return { list, ...pagination };

    function getTerms(query: SearchProductRequestDto): FindConditions<Product> {
      const { productName, brand, minPrice, maxPrice, productSize, color } =
        query;
      const where: FindConditions<Product> = {};

      if (productName) {
        where.productName = productName;
      }

      if (brand) {
        where.brand = brand;
      }

      if (productSize) {
        where.size = productSize;
      }

      if (color) {
        where.color = color;
      }

      if (!!minPrice) {
        where.price = MoreThanOrEqual(minPrice);
      }

      if (!!maxPrice) {
        where.price = LessThanOrEqual(maxPrice);
      }

      return where;
    }
  }

  async findOneOrFail(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException('상품을 찾을 수 없습니다.');
    }
    return product;
  }
}
