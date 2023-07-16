import {Router} from 'express'
import PostController from '../controllers/PostController';
import {validateToken} from '../middlewares/AuthMiddleware'
import multer = require('multer');
import path = require('path')

const routes = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

routes.post("/", validateToken, upload.single("image"), PostController.create)
routes.post("/:post_id", validateToken, PostController.createComment)
 routes.get("/", validateToken, PostController.index)

export default routes;