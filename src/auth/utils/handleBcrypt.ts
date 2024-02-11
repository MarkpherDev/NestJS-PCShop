import { Injectable } from '@nestjs/common'
import * as bycrypt from 'bcrypt'

const saltOrRounds = 10
@Injectable()
export class HandleBcrypt {
  async hashPassword(password: string): Promise<string> {
    const hash = await bycrypt.hash(password, saltOrRounds)
    return hash
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bycrypt.compare(password, hashedPassword)
    return isMatch
  }
}
