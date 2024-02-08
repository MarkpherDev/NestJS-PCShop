import { defaultImage } from 'src/common/contants'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ unique: true, nullable: false })
  model: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number

  @Column({ default: defaultImage })
  image: string
}
