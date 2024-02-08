import {
  IsDecimal,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength
} from 'class-validator'
export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string

  @IsString()
  @MinLength(2)
  model: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number

  @IsString()
  @IsOptional()
  image: string
}
