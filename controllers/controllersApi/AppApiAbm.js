import { conectarBase, setearEstado, altaProducto, mostrarUsuarios, mostrarProductosPaginado} from './AppBDD.js';
import puppeteer from 'puppeteer';
import multer from 'multer';
import { generarJWT } from '../controllersLogin/AppJWT.js';
import { obtenerHtmlTicket } from '../controllersView/AppEjs.js';

const db = await conectarBase();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

//PRUEBA TODOS
export async function obtenerProductosSinPaginado(app) {
  app.get('/api/productos/todos', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM productos');
      res.status(200).json({ productos: rows });
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
      res.status(500).json({ error: 'Error al obtener todos los productos' });
    }
  });
}

// GET /api/productos
export async function ObtenerProductosPaginados(app) {
  app.get('/api/productos', async (req, res) => {
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 4;

    try {
      const resultado = await mostrarProductosPaginado(pagina, limite);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al obtener productos paginados:', error);
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

export async function iniciarSesion(app) {
  app.post('/api/login', async (req, res) => {
    const { email, pass } = req.body;
    const usuarios = await mostrarUsuarios();

    for (const user of usuarios) {
      if (email === user.mail && pass === user.contrasena) {
        const token = await generarJWT({ email, pass });
        
        res.cookie('token', token, {
          httpOnly: true,
          secure: false, // true si usás HTTPS
          sameSite: 'Lax',
          maxAge: 60 * 60 * 1000 // 1 hora
        })

        return res.status(200).json({ message: 'Login exitoso' });
      }
    }
    res.status(401).json({ message: 'Email o contraseña incorrectos' });
  });
}

// export async function cerrarSesion(app) {
//   app.post('/api/logout', (req, res) => {
//     res.clearCookie('token');
//     res.status(200).json({ message: 'Sesión cerrada' });
//   });
// }

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
// export async function VistaModificar(app) {
//   app.get('/modificar', async (req, res) => {
//     const db = await conectarBase();
//     const { id } = req.query;

//     try {
//       const [rows] = await db.query('SELECT * FROM productos WHERE idProducto = ?', [id]);
//       if (rows.length === 0) {
//         return res.status(404).send('Producto no encontrado');
//       }
//       const producto = rows[0];
//       res.render('modificacion', { producto });
//     } catch (error) {
//       console.error('Error al obtener producto para modificar:', error);
//       res.status(500).send('Error del servidor');
//     } finally {
//       await db.end();
//     }
//   });
// }

// POST /modificar/:id
export async function PostModificar(app) {
  app.post('/modificacion/:id', upload.single('imagen'), async (req, res) => {
    const db = await conectarBase();
    const { id } = req.params;
    const { nombre, precio } = req.body;

    const nuevaImg = req.file ? req.file.filename : req.body.imagenActual; 

    try {
      await db.query(
        `UPDATE productos SET nombre = ?, img = ?, precio = ? WHERE idProducto = ?`,
        [nombre, nuevaImg, precio, id]
      );

      console.log(req.body)
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error al modificar producto:', error);
      res.status(500).send('Error al modificar producto');
    } finally {
      await db.end();
    }
  });
}

export async function generarTicket(req, res) {
  const db = await conectarBase();
  const { comprador, precioTotal, productos } = req.body;
  const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
    let [result] = await db.query(
      `INSERT INTO ticket (comprador, precioTotal, fecha) VALUES (?, ?, ?)`,
      [comprador, precioTotal, fecha]
    );
    const idTicket = result.insertId;

    for (const p of productos) {
      await db.query(
        `INSERT INTO ventas (idTicket, idProducto, cantidad, precio) VALUES (?, ?, ?, ?)`,
        [idTicket, p.idProducto, p.cantidad, p.precio]
      )
    }

    res.json({ success: true, idTicket });
  } catch (error) {
    console.error('Error generando ticket:', error);
    res.json({ success: false });
  } finally {
    await db.end();
  }
}

export async function generarPDF(req, res) {
  const idTicket = req.params.id;

  try {
    const html = await obtenerHtmlTicket(idTicket, false);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error generando PDF:', error);
    res.status(500).send('Error generando ticket');}
}

// Alta Producto
export async function darAltaProducto(app) {
  app.post('/alta', upload.single('imagen'), async (req, res) => {
    try {
      const datos = req.body;

      const talleArray = datos.talle?.split(',').map(t => t.trim()).filter(t => t !== '');
      const talle = talleArray.join(',');

      const rutaImg = req.file ? req.file.filename : '';

      const nuevoProducto = {
        nombre: datos.nombre,
        tipo: datos.tipo,
        color: datos.color,
        precio: parseFloat(datos.precio),
        talle,
        img: rutaImg,
        url: datos.url || '',
        tipoBotin: datos.tipo === 'Botin' ? datos.tipoBotin : '',
        tipoZapatilla: datos.tipo === 'Zapatilla' ? datos.tipoZapatilla : '',
        largoTapones: datos.tipo === 'Botin' ? datos.largoTapones : '',
        activo: 1
      };

      await altaProducto(nuevoProducto);
      res.status(200).json({ mensaje: 'Producto agregado con éxito' });

    } catch (error) {
      console.error('Error al agregar producto:', error);
      res.status(500).send('Error al agregar producto: ' + error.message);
    }
  });
}





