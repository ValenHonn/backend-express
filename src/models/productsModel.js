import { DataTypes } from 'sequelize'; //para poder definir los tipos de datos de las columnas
import sequelize from '../../config/database.js'; 

//Un modelo en Sequelize es un objeto de JavaScript que representa una tabla en la base de datos, El modelo permite interactuar con la tabla desde el código.
const Producto = sequelize.define('products', { //Sequelize necesita conocer la estructura para validar y mapear los datos correctamente, por eso 
    id: {
        type: DataTypes.INTEGER, //necesitamos la estructura del modelo para que sequelize pueda construir la consulta SQL correspondiente.
        primaryKey: true,
        autoIncrement: true      //Cuando la base de datos responde con los datos en formato de filas SQL, Sequelize convierte cada fila en una instancia del modelo.
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'products', //forzamos el nombre de la tabla, aunque no es necesario porque sequelize ya convierte el nombre de la tabla en minusculas y plural
    timestamps: false
}
)

export default Producto