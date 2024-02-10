import { IsDecimal, IsString, MinLength } from 'class-validator'
export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string

  @IsString()
  @MinLength(2)
  model: string

  @IsDecimal({ decimal_digits: '2' })
  price: number

  image?: string
}
