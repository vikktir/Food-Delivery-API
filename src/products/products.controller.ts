import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async createProduct(@Body() productData: Omit<Product, 'id'>):
    Promise<Product> {
    return this.productsService.createProduct(productData);
  }

  @Get()
  async getAllProducts():
    Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string):
    Promise<Product | undefined> {
    return this.productsService.getProductById(Number(id));
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string,
                      @Body() productData: Partial<Omit<Product,'id'>>):
    Promise<Product | undefined> {
    return this.productsService.updateProduct(Number(id), productData);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string):
    Promise<{product?: Product[] | null, message: string}> {
    const deletedProduct = await this.productsService.deleteProductById(Number(id));
    if (!deletedProduct) {
      return { product: null, message: "product not found" };
    }
    return { product: deletedProduct, message: "product successfully deleted" };
  }
}
