import { Role } from 'src/common/enums/enums'
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: false, select: false })
  password: string

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role

  @DeleteDateColumn()
  deletedAt: Date
}
