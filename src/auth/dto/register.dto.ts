import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstname?: string

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastname?: string

  @IsEmail()
  email: string

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string
}
