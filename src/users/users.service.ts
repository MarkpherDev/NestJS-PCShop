import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async findAll() {
    return await this.userRepository.find()
  }

  async create(createdUserDto: CreateUserDto) {
    return await this.userRepository.save(createdUserDto)
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  async findOneByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'firstname', 'lastname', 'email', 'password', 'role']
    })
  }
}
