import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm'
import * as fs from 'fs/promises'
import * as path from 'path'
import { rutaProductsImages } from 'src/common/constants/contants'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  async create(createProductDto: CreateProductDto, image: Express.Multer.File) {
    createProductDto.image = image?.filename

    const product = this.productRepository.create(createProductDto)
    return await this.productRepository.save(product)
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

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    image: Express.Multer.File
  ) {
    const productFound = await this.findOne(id)
    if (productFound.image && image) {
      await fs.unlink(
        path.join(process.cwd(), `${rutaProductsImages}${productFound.image}`)
      )
    }
    updateProductDto.image = image?.filename
    await this.productRepository.update(id, updateProductDto)

    return await this.findOne(id)
  }

  async updateWithoutFile(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id)
    await this.productRepository.update(id, updateProductDto)

    return await this.findOne(id)
  }

  async remove(id: number) {
    const productFound = await this.findOne(id)

    await fs.unlink(
      path.join(process.cwd(), `${rutaProductsImages}${productFound.image}`)
    )

    await this.productRepository.delete({ id })

    return {
      message: 'Producto Borrado',
      product: productFound,
      statusCode: HttpStatus.ACCEPTED
    }
  }
}
