import { mostrarProductos, conectarBase } from './AppBDD.js';
const db = await conectarBase();
// GET /api/productos
export async function ObtenerProductos(app) {
  app.get('/api/productos', async (req, res) => {
    try {
      const productos = await mostrarProductos();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  });
}

// GET /api/productos/:id
export async function ObtenerProductoPorId(app) {
  app.get('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.query('SELECT * FROM productos WHERE idProducto = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error al obtener producto por id:', error);
      res.status(500).json({ error: 'Error al obtener producto' });
    }
    finally{
      await db.end();
    }
  });
}

// DELETE /api/productos/:id
export async function EliminarProducto(app) {
  app.delete('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [resultado] = await db.query('DELETE FROM productos WHERE idProducto = ?', [id]);
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
    finally{
      await db.end();
    }
  });
}

// GET /modificar
export async function VistaModificar(app) {
  app.get('/modificar', async (req, res) => {
    const { id } = req.query;
    try {
      const [rows] = await db.query('SELECT * FROM productos WHERE idProducto = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).send('Producto no encontrado');
      }
      const producto = rows[0];
      res.render('modificacion', { producto });
    } catch (error) {
      console.error('Error al obtener producto para modificar:', error);
      res.status(500).send('Error del servidor');
    }
    finally{
      await db.end();
    }
  });
}

// POST /modificar/:id
export async function PostModificar(app) {
  app.post('/modificar/:id', async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, color, talle, precio, stock } = req.body;
    try {
      await db.query(
        'UPDATE productos SET marca = ?, modelo = ?, color = ?, talle = ?, precio = ?, stock = ? WHERE idProducto = ?',
        [marca, modelo, color, talle, precio, stock, id]
      );
      res.redirect('/');
    } catch (error) {
      console.error('Error al modificar producto:', error);
      res.status(500).send('Error al modificar producto');
    }
    finally{
      await db.end();
    }
  });
}