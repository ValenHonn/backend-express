const fs = require('fs').promises

const archivo = 'products.json'

//leer productos
const leerProductos = async () => {
    try {
        const data = await fs.readFile(archivo, 'utf8') //leemos asincronamente, lo que significa que le dejamos la tarea al so, cuando termine, el contenido del archivo se almacena en data
        return JSON.parse(data) //convierte una cadena de texto en un objeto de javascript, para poder hacer las operaciones post, put, delete, etc.
    } catch(error){
        console.error('Error al leer el archivo:', error);
        return []  
    }
}

//escribir productos
const escribirProductos = async (productos) => {
    try {
        await fs.writeFile(archivo, JSON.stringify(productos, null, 2)); //escribe la data en un formato legible
    } catch(error){
        console.error('Error al escribir en el archivo:', error);
    }
}


module.exports = { leerProductos, escribirProductos };