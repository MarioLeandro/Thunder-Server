import {Router} from 'express'
import userRoutes from './user.routes';
import postRoutes from './post.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.use("/user", userRoutes)
routes.use("/post", postRoutes)
routes.use("/", authRoutes)

export default routes;