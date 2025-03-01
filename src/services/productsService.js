import methods from "../utils/fsmethods.js"
import Producto from "../models/productsModel.js";

class ProductService {

    async getProducts() {  

        return await Producto.findAll(); //aunque leerProductos ya involucra una operacion asincrona dentro de ella, es necesario volver a definir una operacion asincrona aca, ya que si no espeamos a que termine de leer el archivo, vamos a devolver un json vacio

    }

    async getProductById(id) {

        const productos = await methods.leerProductos();
        return productos.find(p => p.id === id) || null;

    }

    async createProduct(nuevoProducto) {

        const productos = await methods.leerProductos(); //productos es un array de objetos de javascript
        nuevoProducto.id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
            
        productos.push(nuevoProducto); //insertamos al arreglo el nuevo producto
        await methods.escribirProductos(productos); //sobreescribimos el archivo
        return nuevoProducto

    }

    async updateProduct(id, reqbody) {

        const productos = await methods.leerProductos();
        const index = productos.findIndex(p => p.id === id) || null;

        productos[index] = { id, ...reqbody }; 
        await methods.escribirProductos(productos);
        return productos[index];

    }

    async deleteProduct(id) {

        const productos = await methods.leerProductos();
        const productosFiltrados = productos.filter(p => p.id !== id);
    
        if (productos.length === productosFiltrados.length) {
            return null;
        }
    
        await methods.escribirProductos(productosFiltrados);
        return id;
    }

}

export default ProductService