import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

//set image storage config
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

//set allowed file types
function checkFileType(file, cb) {
    //allowed file types
    const filetypes = /jpg|jpeg|png/
    //get extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    //check file type
    if(extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only')
    }
}

//upload image
const upload = multer({
    storage,
    fileFilter: function(req, file ,cb){
        checkFileType(file, cb)
    }
})


router.post('/', upload.single('image'), (req, res) => {
    //return image file path
    res.send(`/${req.file.path}`)
})


export default router