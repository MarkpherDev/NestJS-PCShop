import { Module } from '@nestjs/common'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductsModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
