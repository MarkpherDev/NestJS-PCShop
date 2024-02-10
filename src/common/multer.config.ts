import { BadRequestException } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { existsSync, mkdirSync } from 'fs'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 as uuid } from 'uuid'

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: 50000000
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true)
    } else {
      cb(new BadRequestException('Unsopported File Type'), false)
    }
  },
  storage: diskStorage({
    destination: (req: any, file: Express.Multer.File, cb: any) => {
      const uploadPath = './public/images'
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath)
      }
      cb(null, uploadPath)
    },
    filename: (req: any, file: Express.Multer.File, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`)
    }
  })
}
