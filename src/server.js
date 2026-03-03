import express from 'express' //guardo el modulo express en la variable express
import productsRouter from './routes/productsRoutes.js' //importamos el objeto router para poder usarlo en el middleware
import authRoutes from './routes/authRoutes.js'
//import sequelize from './config/database.js''
import morgan from 'morgan';
import cookieParser from 'cookie-parser'; 

const app = express() //ejecuto la funcion express y guardo el objeto resultante de la funcion en la variable app, que es un servidor que me permite manejar solicitudes y mas

//middlewares
app.use(express.json())//por defecto express no sabe leer datos en formato json, esto lo corrige, sirve para que req.body no venga undefined
app.use(morgan('dev')) //middleware para ver por consola las peticiones que llegan
app.use(cookieParser()) //middleware que me permite convertir las cookies en un objeto json, sin esto tendria que partir el string referente a la cookie para leer el token
app.use(productsRouter) //si alguna request coincide con una ruta definida ahí, que la maneje ese router
app.use(authRoutes)



app.get('/', (req, res) => { //una vez que el server app recibe una solicitud get en la ruta principal, ejecuta un callback con parametros req y res, req contiene toda la data del request y res esta vacio (por ahora), pero sirve para enviar la respuesta al front
    res.send('Hello World')
})


app.listen(3000, () => { //app tiene un metodo listen que permite definir en que puerto el servidor va a estar escuchando las peticiones
    console.log('Servidor escuchando en el puerto 3000') //una vez que se pone a escuchar se ejecuta un callback que hace saber por consola que el metodo se ejecuto correctamente
})