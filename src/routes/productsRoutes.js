import express from 'express'
import productsController from '../controllers/productsController.js'

//el metodo router me permite definir rutas de forma modular en mi proyecto
const router = express.Router()

router.get('/products', productsController.getProducts)

router.get('/products/:id',productsController.getProductById )

router.post('/products', productsController.createProduct)

router.put('/products/:id', productsController.updateProduct)

router.delete('/products/:id', productsController.deleteProduct)

export default router