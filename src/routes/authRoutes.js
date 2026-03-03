import {Router} from 'express';
import authController from '../controllers/authController.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router() //con esta constante podemos crear multiples rutas, con los metodos get, post, etc.

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.post('/api/logout', authController.logout)
router.get('/api/profile', authRequired ,authController.profile) //validateToken es un middleware, una funcion que se va a ejecutar antes de que se llegue a una ruta determinada

export default router