# backend-express

Capas del proyecto

1- Server
Encargada de levantar el servidor, establecer middlewares, cargar las rutas de la aplicacion

2- Routes
Encargada de definir los endpoints y llamar al controlador encargado de ese endpoint.
Hace uso de los metodos REST.

3- Controllers
Reciben la solicitud http y llama al servicio encargado de manejar la solicitud, es decir, llama al servicio para que realice la logica de negocio necesaria.
Son los encargados de darle una respuesta al cliente con los datos correspondientes.

4- Services
Contiene la logica de negocio de la aplicacion.
Llama a un metodo del modelo para comunicarse indirectamente con la base de datos.

5- Models
Representa la estructura de la base de datos, e interactua directamente con ella.
Se hace uso del orm sequelize, que me permite:
1- Comunicarme a la base de datos en forma mas rapida, es decir, tratar a las tablas como objetos, y comunicarse con ellas a traves de metodos en vez de consultas.
2- Utilizar migraciones, que me permiten cambiar el esquema de la base de datos sin perder los datos, ademas de manejar el versionado de la bd.
3- Utilizar seeders, que me permiten insertar datos de prueba, y manejar un versionado de estos datos.
Todo esto utilizando la herramienta sequelize-cli, que me permiten realizar estos pasos de una forma mas sencilla y rapida.
