import {Router} from 'express'
import userRoutes from './user.routes';
import postRoutes from './post.routes';
import trainingRoutes from './training.routes';
import dietRoutes from './diet.routes';
import authRoutes from './auth.routes';


const routes = Router();

routes.use("/user", userRoutes)
routes.use("/post", postRoutes)
routes.use("/training", trainingRoutes)
routes.use("/diet", dietRoutes)
routes.use("/", authRoutes)

export default routes;