import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants/jwt.contants'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { HandleBcrypt } from './utils/handleBcrypt'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, HandleBcrypt]
})
export class AuthModule {}
