import Producto from "../models/productsModel.js";

class ProductService { //cada elemento del dominio se va a dividir en clases, el cual tendra los metodos http para manipularlo

    async getProducts() {  
        try {

            return await Producto.findAll(); //await porque estoy llamando a la funcion, no pasar la funcion como dato que alguien más la ejecutará después, como en routes
            
        } catch(error) {

            throw new Error("Error al obtener los productos de la base de datos");

        }
    }

    async getProductById(id) {
        try {

            return await Producto.findByPk(id);

        } catch(error) {

            throw new Error("Error al obtener el producto de la base de datos");

        }
    }

    async createProduct(nuevoProducto) {

        try{

            return await Producto.create(nuevoProducto) 

        } catch(error){

            throw new Error("Error al crear el producto en la base de datos");

        }

    }

    async updateProduct(id, reqbody) {

        try {

            const producto = await Producto.findByPk(id)
            if (!producto) {
                return null; 
            }

            await producto.update(reqbody)
            return producto.id
            

        } catch(error){

            throw new Error("Error al actualizar el producto de la base de datos");

        }

    }

    async deleteProduct(id) {

       try {

            const producto = await Producto.findByPk(id) // me devuelve una instancia de la clase Producto, la cual hace referencia a la tabla products
            if (!producto) {
                return null; 
            }

            await producto.destroy()
            return producto.id

       } catch(error) {

        throw new Error("Error al eliminar el producto de la base de datos");

       }

}

}

export default ProductService