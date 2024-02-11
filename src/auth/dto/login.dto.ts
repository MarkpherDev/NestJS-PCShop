import { Transform } from 'class-transformer'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail()
  email: string

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string
}
