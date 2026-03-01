import {Router} from 'express';
import authController from '../controllers/authController.js';

const router = Router() //con esta constante podemos crear multiples rutas, con los metodos get, post, etc.

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);

export default router