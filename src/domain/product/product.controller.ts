import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '../../libs/guards/auth.guard';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductRequestDto } from './dto/update-product-request.dto';
import { SearchProductRequestDto } from './dto/search-product-request.dto';
import { IListResponse } from '../../libs/interfaces/response.interface';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 상품 등록 API
  @Post()
  async create(
    @Body() dto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.createProduct(dto);
  }

  // 상품 수정 API
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    dto.id = id;
    return this.productService.update(dto);
  }

  // 상품 삭제 API
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
  }

  // 상품 단건 조회 API
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ProductResponseDto> {
    return this.productService.get(id);
  }

  // 상품 다건 조회 API
  @Get()
  async search(
    @Query() query: SearchProductRequestDto,
  ): Promise<IListResponse<ProductResponseDto>> {
    return this.productService.search(query);
  }
}
