const express = require('express') //guardo el modulo express en la variable express
const productsRouter = require('./routes/products') //importamos el objeto router


const app = express() //ejecuto la funcion express y guardo el objeto resultante de la funcion en la variable app, que es un servidor que me permite manejar solicitudes y mas

//middlewares
app.use(express.json())//por defecto express no sabe leer datos en formato json, esto lo corrige
app.use(productsRouter)
 
app.get('/', (req, res) => { //una vez que el server app recibe una solicitud get en la ruta principal, ejecuta un callback con parametros req y res, req contiene toda la data del request y res esta vacio, pero sirve para enviar la respuesta al front
    res.send('Hello World')
})


app.listen(3000, () => { //app tiene un metodo listen que permite definir en que puerto el servidor va a estar escuchando las peticiones
    console.log('Servidor escuchando en el puerto 3000') //una vez que se pone a escuchar se ejecuta un callback que hace saber por consola que el metodo se ejecuto correctamente
})