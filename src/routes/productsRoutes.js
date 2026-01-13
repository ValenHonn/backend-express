import express from 'express'
import productsController from '../controllers/productsController.js' //importamos todo lo necesario de la capa controller para llamar a sus funciones despues

//el metodo router me permite definir rutas de forma modular en mi proyecto
// express.Router() crea un objeto router que tiene las mismas funciones que app, y sirve para poder definir los endpoints, para despues llamar...
// ...al controlador encargado de ese endpoint
const router = express.Router()

router.get('/products', productsController.getProducts) //metodo: get, ruta: /products, handler: getProducts
//el handler es una función que maneja una request HTTP, recibe la request (req), decide qué hacer con ella, y devuelve una response (res), por...
// ...eso esta funcion se escribe con req y res siempre

router.get('/products/:id',productsController.getProductById )

router.post('/products', productsController.createProduct)

router.put('/products/:id', productsController.updateProduct)

router.delete('/products/:id', productsController.deleteProduct)

export default router