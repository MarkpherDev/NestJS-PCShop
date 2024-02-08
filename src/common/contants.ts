import { diskStorage } from 'multer'

export const defaultImage = './default.jpg'

export const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    const fileExt = file?.mimetype?.split('/')[1]
    const fileGen = `${Date.now()}.${fileExt}`
    cb(null, fileGen)
  }
})
