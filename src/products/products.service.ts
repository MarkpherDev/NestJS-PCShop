import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto)
  }

  async findAll() {
    return await this.productRepository.find()
  }

  async findOne(id: number) {
    const productFound = await this.productRepository.findOneBy({ id })

    if (!productFound) {
      throw new NotFoundException('Product not found')
    }

    return productFound
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productFound = await this.findOne(id)

    if (!productFound) {
      throw new NotFoundException('Product not found')
    }
    await this.productRepository.update(id, updateProductDto)

    return await this.findOne(id)
  }

  async remove(id: number) {
    const productFound = await this.findOne(id)

    if (!productFound) {
      throw new NotFoundException('Product not found')
    }

    await this.productRepository.delete({ id })

    return {
      message: 'Producto Borrado',
      product: productFound,
      statusCode: HttpStatus.ACCEPTED
    }
  }
}
