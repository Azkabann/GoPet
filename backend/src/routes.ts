import {Router} from 'express';
import multer from 'multer';

import uploadsConfig from './config/uploads';
import kennelsController from './controllers/kennelsController';


const routes=Router();
const upload= multer(uploadsConfig);

routes.get('/kennels', kennelsController.index);
routes.get('/kennels/:id',kennelsController.Show)
routes.post('/kennels', upload.array('images'),kennelsController.create);

  

export default routes;