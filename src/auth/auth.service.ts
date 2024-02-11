import {
  Injectable,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { RegisterDto } from './dto/register.dto'
import { HandleBcrypt } from 'src/auth/utils/handleBcrypt'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly handleBcrypt: HandleBcrypt
  ) {}
  async register({ firstname, lastname, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email)
    if (user) {
      throw new BadRequestException('User already exists')
    }
    const hashedPassword = await this.handleBcrypt.hashPassword(password)
    await this.userService.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    })
    return {
      name: `${firstname} ${lastname}`,
      email
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmailWithPassword(email)
    if (!user) {
      throw new UnauthorizedException('Invalid Email')
    }

    const passwordValid = await this.handleBcrypt.comparePassword(
      password,
      user.password
    )
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid Password')
    }
    const payload = { email: user.email, role: user.role }
    const token = await this.jwtService.signAsync(payload)
    return {
      email: user.email,
      token
    }
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.userService.findOneByEmail(email)
  }
}
