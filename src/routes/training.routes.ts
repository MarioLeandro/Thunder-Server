import {Router} from 'express'
import TrainingController from '../controllers/TrainingController';

const routes = Router();

routes.post("/", TrainingController.generate)

export default routes;
