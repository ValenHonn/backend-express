import ProductService from "../services/productsService.js";

const productService = new ProductService()

const getProducts = async (req, res) => { 

    try { //El bloque try intenta ejecutar el código dentro de él.
        const productos = await productService.getProducts() // await espera a que la promesa que le retorna getProducts() pase de pending a fulfilled, entonces ahi recien sigue con la ejecucion de la funcion.
        res.status(200).json(productos);
    }
    catch(error) { //Si ocurre un error, se detiene la ejecución y se pasa al bloque catch, que captura el error y permite manejarlo.
        res.status(500).json({ error: 'Error al obtener los productos', error });
    }

}

const getProductById = async (req, res) => {

    try {
        const id = parseInt(req.params.id); //saco el id de la request
        const producto = await productService.getProductById(id) //llamo al servicio correspondiente

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json(producto); //devuelvo el producto en formato json
    }
    catch(error) {
        res.status(500).json({ error: 'Error al obtener los productos', error });
    }

}

const createProduct = async (req, res) => {
    
    try{
        const nuevoProducto = req.body;
        const nuevoprod = await productService.createProduct(nuevoProducto)
        res.status(201).json({ exito: 'Producto creado exitosamente' });
    }
    catch(error) {
        console.error('Error en createProduct:', error.message, error.stack); 
        res.status(500).json({ error: 'Error interno al crear el producto' });
    }
    
}

const updateProduct = async (req, res) => {

    try{
        const id = parseInt(req.params.id);
        const idproducto = await productService.updateProduct(id,req.body)

        if (!idproducto) {
            return res.status(404).json({ error: `Producto con id ${id} no encontrado` });
        }

        res.status(200).json({ mensaje: `Producto con id ${idproducto} actualizado` });
    }
    catch(error){
        //console.error('Error en updateProduct:', error.message, error.stack); 
        res.status(500).json({ error: 'Error interno al actualizar el producto' });
    }

}

const deleteProduct = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const idproducto = await productService.deleteProduct(id)

        if (!idproducto) {
            return res.status(404).json({ error: `Producto con id ${id} no encontrado` });
        }

        res.status(200).json({ mensaje: `Producto con id ${idproducto} eliminado` });
    }
    catch(error) {
        res.status(500).json({ error: 'Error al eliminar el producto', error });
    }

}

export default { getProducts, createProduct, updateProduct, deleteProduct, getProductById };