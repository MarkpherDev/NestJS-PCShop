import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from 'src/common/config/multer.config'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.productsService.create(createProductDto, image)
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id)
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File | undefined
  ) {
    if (!file) {
      return this.productsService.updateWithoutFile(id, updateProductDto)
    }
    return this.productsService.update(id, updateProductDto, file)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id)
  }
}
