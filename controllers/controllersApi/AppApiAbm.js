import { mostrarProductos, conectarBase, setearEstado, altaProducto } from './AppBDD.js';

import ejs from 'ejs';
import puppeteer from 'puppeteer';

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
    finally {
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
    finally {
      await db.end();
    }
  });
}

export async function cambiarEstadoProducto(app) {
  app.patch('/api/productos/:id/estado', async (req, res) => {
    const idProducto = req.params.id;
    const { activo } = req.body;
    try {
      await setearEstado(idProducto, activo);
      res.status(200).json({ message: 'Estado actualizado' });
    } catch (error) {
      console.error('Error al cambiar estado del producto:', error);
      res.status(500).json({ error: error.message });
    }
  });
}


// GET /modificar
export async function VistaModificar(app) {
  app.get('/modificar', async (req, res) => {
    const db = await conectarBase();
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
    } finally {
      await db.end();
    }
  });
}

// POST /modificar/:id
export async function PostModificar(app) {
  app.post('/modificacion/:id', async (req, res) => {
    const db = await conectarBase();
    const { id } = req.params;
    const { nombre, tipo, color, talle, precio, tipoBotin, largoTapones } = req.body;

    try {
      await db.query(
        `UPDATE productos SET nombre=?, tipo=?, color=?, talle=?, precio=?, tipoBotin=?, largoTapones=? WHERE idProducto=?`,
        [nombre, tipo, color, talle, precio, tipoBotin || null, largoTapones || null, id]
      );
      res.redirect('/');
    } catch (error) {
      console.error('Error al modificar producto:', error);
      res.status(500).send('Error al modificar producto');
    } finally {
      await db.end();
    }
  });
}


export function PostGenerarTicket(app) {
  app.post('/generar-ticket', async (req, res) => {
    const db = await conectarBase();
    const { comprador, precioTotal } = req.body;
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
      const [result] = await db.query(
        `INSERT INTO ticket (comprador, precioTotal, fecha) VALUES (?, ?, ?)`,
        [comprador, precioTotal, fecha]
      );
      const idTicket = result.insertId;
      res.json({ success: true, idTicket });
    } catch (err) {
      console.error('Error posstt generando ticket:', err);
      res.json({ success: false });
    } finally {
      await db.end();
    }
  });

  app.get('/ticket/:id', async (req, res) => {
    const db = await conectarBase();
    const { id } = req.params;

    try {
      const [rows] = await db.query('SELECT * FROM ticket WHERE idTicket = ?', [id]);
      const ticket = rows[0];

      if (!ticket) return res.status(404).send('Ticket no encontrado');

      const html = await ejs.renderFile('view/ticket.ejs', { ticket });

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      const pdf = await page.pdf({ format: 'A4' });

      await browser.close();

      res.contentType('application/pdf');
      res.send(pdf);
    } catch (err) {
      console.error('Error generando PDF:', err);
      res.status(500).send('Error generando ticket');
    } finally {
      await db.end();
    }
  });
}

// Alta Producto
export async function darAltaProducto(app) {
  app.post('/alta', (req, res) => {
    const datos = req.body;

    // Procesar talles si vienen separados por comas
    let talleArray = datos.talle?.split(',').map(t => t.trim()).filter(t => t !== '');
    let talle = talleArray.join(',');  // "guardo talle como String para la BDD (esta guardado como SET, necesita strings)"

    // Armar el objeto de producto
    const nuevoProducto = {
      nombre: datos.nombre,
      tipo: datos.tipo,
      color: datos.color,
      precio: parseFloat(datos.precio),
      talle,
      img: datos.img || '',  // opcional
      url: datos.url || '',  // opcional
      tipoBotin: datos.tipo === 'Botin' ? datos.tipoBotin : '',
      tipoZapatilla: datos.tipo === 'Zapatilla' ? datos.tipoZapatilla : '',
      largoTapones: datos.tipo === 'Botin' ? datos.largoTapones : '',
      activo: true
    };

    altaProducto(nuevoProducto)
      //.then(() => res.redirect('/'))  // No se puede redireccionar si estoy usando fetch (res.status(200).json para mostrar modal)
      .then(() => res.status(200).json({ mensaje: 'Producto agregado con éxito' }))
      .catch(err => res.status(500).send('Error al agregar producto: ' + err));
  })
};




