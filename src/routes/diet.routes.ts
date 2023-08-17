import {Router} from 'express'
import DietController from '../controllers/DietController';

const routes = Router();

routes.post("/", DietController.generate)
routes.post("/change", DietController.changeFood)

export default routes;
