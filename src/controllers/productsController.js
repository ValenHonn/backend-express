import methods from '../utils/fsmethods.js'

const getProducts = async (req, res) => { //
    const productos = await methods.leerProductos(); //aunque leerProductos ya involucra una operacion asincrona dentro de ella, es necesario volver a definir una operacion asincrona aca, ya que si no espeamos a que termine de leer el archivo, vamos a devolver un json vacio
    res.json(productos);
}

const getProductById = async (req, res) => {
    const productos = await methods.leerProductos();
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productos[index]);
}

const createProduct = async (req, res) => {
    
    const productos = await methods.leerProductos(); //productos es un array de objetos de javascript
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
        
    productos.push(nuevoProducto); //insertamos al arreglo el nuevo producto
    await methods.escribirProductos(productos); //sobreescribimos el archivo
        
    res.status(201).json(nuevoProducto);
    
}

const updateProduct = async (req, res) => {

    const productos = await methods.leerProductos();
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    productos[index] = { id, ...req.body }; 
    await methods.escribirProductos(productos);

    res.json(productos[index]);
}

const deleteProduct = async (req, res) => {
    const productos = await methods.leerProductos();
    const id = parseInt(req.params.id);
    const productosFiltrados = productos.filter(p => p.id !== id);

    if (productos.length === productosFiltrados.length) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await methods.escribirProductos(productosFiltrados);
    res.json({ mensaje: `Producto con ID ${id} eliminado` });
}

export default { getProducts, createProduct, updateProduct, deleteProduct, getProductById };