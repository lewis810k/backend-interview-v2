import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { ProductService } from './product.service';
import { Product } from '../../libs/entities/product.entity';
import { AuthGuard } from '../../libs/guards/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateProductRequestDto): Promise<Product> {
    return this.productService.createProduct(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: number) {
    throw new BadRequestException('to be implemented');
  }

  @Delete(':id')
  async delete() {
    throw new BadRequestException('to be implemented');
  }

  @Get(':id')
  async getOne() {
    throw new BadRequestException('to be implemented');
  }

  @Get()
  async search() {
    throw new BadRequestException('to be implemented');
  }
}
