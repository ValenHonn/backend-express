import ProductService from "../services/productsService.js";

const productService = new ProductService()

const getProducts = async (req, res) => { 

    try {
        const productos = await productService.getProducts()
        res.json(productos);
    }
    catch(error) {
        res.status(500).json({ error: 'Error al obtener los productos', error });
    }

}

const getProductById = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const producto = await productService.getProductById(id)
        res.json(producto);
    }
    catch(error) {
        res.status(500).json({ error: 'Error al obtener los productos', error });
    }

}

const createProduct = async (req, res) => {
    
    try{
        const nuevoProducto = req.body;
        const nuevoprod = await productService.createProduct(nuevoProducto)
        res.status(201).json(nuevoProducto);
    }
    catch(error) {
        console.error('Error en createProduct:', error.message, error.stack); 
        res.status(500).json({ error: 'Error interno al crear el producto' });
    }
    
}

const updateProduct = async (req, res) => {

    try{
        const id = parseInt(req.params.id);
        const indiceproducto = await productService.updateProduct(id,req.body)
        res.json(indiceproducto)
    }
    catch(error){
        console.error('Error en updateProduct:', error.message, error.stack); 
        res.status(500).json({ error: 'Error interno al actualizar el producto' });
    }

}

const deleteProduct = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const idproducto = await productService.deleteProduct(id)
        res.json({ mensaje: `Producto con ID ${idproducto} eliminado` });
    }
    catch(error) {
        res.status(500).json({ error: 'Error al eliminar el producto', error });
    }

}

export default { getProducts, createProduct, updateProduct, deleteProduct, getProductById };