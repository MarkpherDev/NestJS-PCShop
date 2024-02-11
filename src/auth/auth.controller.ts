import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { Auth } from './decorators/auth.decorator'
import { Role } from 'src/common/enums/enums'
import { Request } from 'express'
import { ActiveUser } from 'src/common/decorators/active-user.decorator'
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'

interface RequestWithUser extends Request {
  user: {
    email: string
    role: string
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Get('profile')
  @Auth(Role.ADMIN)
  @Auth(Role.EMPLOYEE)
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user)
  }
}
