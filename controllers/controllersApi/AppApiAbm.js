import express from 'express';
import { mostrarProductos, conexion} from './AppBDD.js'; //AGrego conexion
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express()
const port = process.env.PORT_API;

app.use(express.json());
app.use(cors());
    
app.get('/api/productos', async (req,res) => {
    try {
        const productos = await mostrarProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});


//Agrego GET de producto porque los traia sin poder filtrarlos por ID
app.get('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conexion.query('SELECT * FROM productos WHERE idProducto = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener producto por id:', error);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
});

app.delete('/api/productos/:id', async (req, res) => { 
    const { id } = req.params;
    try {
        const [resultado] = await conexion.query('DELETE FROM productos WHERE idProducto = ?', [id]);
        console.log('Resultado de DELETE:', resultado);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

app.get('/modificar', async (req, res) => { //Esta ruta es para redirigir desde el botón “Modificar” a una vista donde puedas editar el producto. Ejemplo:
    const { id } = req.query;
    try {
        const [rows] = await conexion.query('SELECT * FROM productos WHERE idProducto = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        const producto = rows[0];
        res.render('modificacion', { producto });
    } catch (error) {
        console.error('Error al obtener producto para modificar:', error);
        res.status(500).send('Error del servidor');
    }
});

app.post('/modificar/:id', async (req, res) => { //Ruta para actualizar producto, Ver luego...
    const { id } = req.params;
    const { marca, modelo, color, talle, precio, stock } = req.body;
    try {
        await conexion.query(
            'UPDATE productos SET marca = ?, modelo = ?, color = ?, talle = ?, precio = ?, stock = ? WHERE idProducto = ?',
            [marca, modelo, color, talle, precio, stock, id]
        );
        res.redirect('/');
    } catch (error) {
        console.error('Error al modificar producto:', error);
        res.status(500).send('Error al modificar producto');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});