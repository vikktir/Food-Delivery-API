import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private idCounter = 1;

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    const newProduct: Product = { id: this.idCounter++, ...productData };
    this.products.push(newProduct);
    return newProduct;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductById(id: number): Promise<Product | undefined>{
    return this.products.find(product => product.id === id);
  }

  async updateProduct(id: number, productData: Partial<Omit<Product,'id'>>): Promise<Product | undefined> {
    const productIndex = this.products.findIndex(product => product.id === id);
    if(productIndex === -1) return undefined;

    this.products[productIndex] = { ...this.products[productIndex], ...productData };
    return this.products[productIndex];
  }

  async deleteProductById(id: number): Promise<Product[] | null> {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return null;
    }
    return this.products.splice(index, 1);
  }
}

