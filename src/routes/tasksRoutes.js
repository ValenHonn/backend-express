import {Router} from 'express';
import tasksController from '../controllers/tasksController.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.js';
import { createTaskSchema } from '../schemas/tasksSchema.js';

const router = Router()

router.get('/api/tasks', authRequired, tasksController.getTasks)
router.get('/api/tasks/:id', authRequired, tasksController.getTask)
router.post('/api/tasks', authRequired, validateSchema(createTaskSchema) , tasksController.createTask) //verificamos si el usuario esta autenticado y despues verificamos si los datos de la tarea son correctos
router.delete('/api/tasks/:id', authRequired, tasksController.deleteTask)
router.put('/api/tasks/:id', authRequired, tasksController.updateTask)

export default router