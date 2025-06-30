import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export async function conectarBase() {
  try {
    const db = await mysql.createConnection({
      host: process.env.HOST_DB,
      user: process.env.USER_DB,
      password: process.env.PASS_DB,
      database: "justpickit",
      multipleStatements: true,
    });

    return db;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function crearDB(db) {
  let qry = "CREATE DATABASE IF NOT EXISTS justpickit;";
  let resultado = await db.query(qry);
}

async function eliminarDB(db) {
  let qry = "DROP DATABASE IF EXISTS justpickit;";
  let resultado = await db.query(qry);

  console.log(`Base de datos eliminada`);
}

async function crearTablas(db) {
  let qry = `CREATE TABLE productos (idProducto bigint(20) unsigned NOT NULL AUTO_INCREMENT,nombre varchar(50) NOT NULL,tipo varchar(50) NOT NULL,talle varchar(100) NOT NULL,color varchar(30) NOT NULL,img varchar(200) NOT NULL,url varchar(200) NOT NULL,precio double(30,2) NOT NULL,tipoBotin varchar(50) DEFAULT NULL,tipoZapatilla varchar(50) DEFAULT NULL,largoTapones varchar(30) DEFAULT NULL,activo boolean NOT NULL DEFAULT True,PRIMARY KEY (idProducto)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    CREATE TABLE ticket (idTicket bigint(20) unsigned NOT NULL AUTO_INCREMENT,comprador varchar(50) NOT NULL,precioTotal double NOT NULL,fecha datetime NOT NULL DEFAULT current_timestamp(),PRIMARY KEY (idTicket),UNIQUE KEY idTicket (idTicket)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    CREATE TABLE usuarios (idUsuario bigint(20) unsigned NOT NULL AUTO_INCREMENT,mail varchar(30) NOT NULL,contrasena varchar(30) NOT NULL,PRIMARY KEY (idUsuario)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    CREATE TABLE ventas (idVenta int(11) NOT NULL AUTO_INCREMENT,idTicket bigint(20) unsigned NOT NULL,idProducto bigint(20) unsigned NOT NULL,cantidad int(11) NOT NULL,precio double(10,2) NOT NULL,PRIMARY KEY (idVenta),FOREIGN KEY (idTicket) REFERENCES ticket(idTicket) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (idProducto) REFERENCES productos(idProducto) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
  let resultado = await db.query(qry);

  console.log(`Base de datos con sus tablas creadas`);
}

export async function initDB() {
  const db = await conectarBase();

  try {
    await eliminarDB(db);
  } catch (error) {
    console.error(error.message);
  }

  try {
    await crearDB(db);
  } catch (error) {
    console.error(error.message);
  }

  try {
    await db.query("USE justpickit;");
    await crearTablas(db);
  } catch (error) {
    console.error(error.message);
  }

  try {
    let zapatillas = [
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike SB Dunk Low Premium', 'Zapatilla', '40,41,42', 'Blanco', 'https://nikearprod.vtexassets.com/arquivos/ids/1022227-800-800?width=800&height=800&aspect=true', 'https://www.nike.com.ar/nike-sb-dunk-low-premium-low-rayssa-leal-fz5251-001/p', 229999.00, NULL, 'Moda', NULL);`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Air Jordan 1 Low OG', 'Zapatilla', '38,39,40', 'Obsidian', 'https://nikearprod.vtexassets.com/arquivos/ids/1388751-800-800?width=800&height=800&aspect=true', 'https://www.nike.com.ar/air-jordan-1-low-og-obsidian-cz0790-400/p', 269999.00, NULL, 'Jordan', NULL);`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Air Pegasus Wave', 'Zapatilla', '37,38', 'Verde', 'https://nikearprod.vtexassets.com/arquivos/ids/1217383-800-800?width=800&height=800&aspect=true', 'https://www.nike.com.ar/nike-air-pegasus-wave-ib0612-700/p', 299999.00, NULL, 'Moda', NULL);`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('KD17', 'Zapatilla', '43,44,46', 'Naranja', 'https://nikearprod.vtexassets.com/arquivos/ids/1363432-800-800?width=800&height=800&aspect=true', 'https://www.nike.com.ar/kd17-fj9487-800/p', 289999.00, NULL, 'Basquet', NULL);`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Pegasus 41', 'Zapatilla', '33,34,35,36', 'Blanco', 'https://nikearprod.vtexassets.com/arquivos/ids/1066851-800-800?width=800&height=800&aspect=true', 'https://www.nike.com.ar/nike-pegasus-41-fd2723-004/p', 229999.00, NULL, 'Running', NULL);`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike V2K Run', 'Zapatilla', '31', 'Beige', 'https://nikearprod.vtexassets.com/arquivos/ids/1280010-800-800?width=800&height=800&aspect=true', 'https://www.nike.com.ar/nike-v2k-run-hv3917-133/p', 249999.00, NULL, 'Moda', NULL);`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Dunk Low SE', 'Zapatilla', '40,41', 'Verde', 'https://nikearprod.vtexassets.com/arquivos/ids/1139964-800-800?width=800&height=800&aspect=true', 'https://www.nike.com.ar/nike-dunk-low-se-hq1519-030/p', 249999.00, NULL, 'Moda', NULL);`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Juniper Trail 3', 'Zapatilla', '40,41,42,46', 'Negro', 'https://nikearprod.vtexassets.com/arquivos/ids/1055067-800-800?width=800&height=800&aspect=true', 'https://www.nike.com.ar/nike-juniper-trail-3-fq0904-001/p', 169999.00, NULL, 'Trail', NULL);`,
    ];

    let botines = [
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Phantom GX 2 Elite Erling Haaland','Botin','40,41','Azul','https://nikearprod.vtexassets.com/arquivos/ids/1336271-800-800?width=800&height=800&aspect=true','https://www.nike.com.ar/nike-phantom-gx-2-elite-erling-haaland-hf6361-400/p',499999.00,'Cesped','NULL','Mediano');`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Tiempo Legend 10 Club','Botin','33,41,45','Negro','https://nikearprod.vtexassets.com/arquivos/ids/1164849-800-800?width=800&height=800&aspect=true','https://www.nike.com.ar/nike-tiempo-legend-10-club-dv4345-002/p',109999.00,'Sintetico','NULL','NULL');`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Tiempo Legend 10 Elite','Botin','35,36,37,38','Salmon','https://nikearprod.vtexassets.com/arquivos/ids/1328080-800-800?width=800&height=800&aspect=true','https://www.nike.com.ar/nike-tiempo-legend-10-elite-dv4328-800/p',429999.00,'Cesped','NULL','Corto');`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Mercurial Superfly 10 Academy','Botin','40,42','Verde','https://nikearprod.vtexassets.com/arquivos/ids/1183984-800-800?width=800&height=800&aspect=true','https://www.nike.com.ar/nike-mercurial-superfly-10-academy-fq1456-700/p',199999.00,'Cesped','NULL','Corto');`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Tiempo Legend 10 Pro','Botin','50','Plateado','https://nikearprod.vtexassets.com/arquivos/ids/1183068-800-800?width=800&height=800&aspect=true','https://www.nike.com.ar/nike-tiempo-legend-10-pro-dv4336-001/p',239999.00,'Sintetico','NULL','NULL');`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Mercurial Vapor 16 Pro','Botin','40,41,42','Rojo','https://nikearprod.vtexassets.com/arquivos/ids/1328547-800-800?width=800&height=800&aspect=true','https://www.nike.com.ar/nike-mercurial-vapor-16-pro-fq8685-800/p',249999.00,'Cesped','NULL','Largo');`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Mercurial Superfly 10 Elite SE','Botin','40,41,42','Galaxia','https://nikearprod.vtexassets.com/arquivos/ids/1112007-800-800?width=800&height=800&aspect=true','https://www.nike.com.ar/nike-mercurial-superfly-10-elite-se-fq8309-001/p',549999.00,'Cesped','NULL','Mediano');`,
      `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Zoom Mercurial Vapor 15 Elite SG-PRO','Botin','40,41,42','Celeste','https://nikearprod.vtexassets.com/arquivos/ids/1461235-800-800?width=800&height=800&aspect=true','https://www.nike.com.ar/nike-zoom-mercurial-vapor-15-elite-sg-pro-fd0243-300/p',499999.00,'Cesped','NULL','Largo');`,];
    for (const x of zapatillas) {
      let resultado = await db.execute(x);
    }
    for (const x of botines) {
      let resultado = await db.execute(x);
    }
    console.log("Producto insertado correctamente");
  } catch (err) {
    console.error("Error(3):", err.message);
  }

  try {
    let usuarios = [
      `INSERT INTO usuarios (mail, contrasena) VALUES ('admin@justpickit.com', 'admin');`,
      `INSERT INTO usuarios (mail, contrasena) VALUES ('user@justpickit.com', 'user');`,
    ];
    for (const x of usuarios) {
      let resultado = await db.execute(x);
    }
    console.log("Usuarios insertados correctamente");
  } catch (err) {
    console.error(err.message);
  } finally {
    await db.end();
  }
}

export async function mostrarUsuarios() {
  const db = await conectarBase();
  try {
    const qry = "select * from usuarios";
    const [rows] = await db.execute(qry);

    return rows;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  } finally {
    await db.end();
  }
}

export async function setearEstado(idProducto, estado) {
  const db = await conectarBase();
  try {
    const qry = `UPDATE productos SET activo = ? WHERE idProducto = ?`;
    await db.query(qry, [estado ? 1 : 0, idProducto]);
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  } finally {
    await db.end();
  }
}

export async function altaProducto(producto) {
  try {
    const db = await conectarBase();

    const qry = `
        INSERT INTO productos 
            (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones, activo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

    const valores = [
      producto.nombre,
      producto.tipo,
      producto.talle,
      producto.color,
      producto.img,
      producto.url,
      producto.precio,
      producto.tipoBotin,
      producto.tipoZapatilla,
      producto.largoTapones,
      producto.activo ?? true,
    ];

    const [resultado] = await db.query(qry, valores);

    console.log(`Producto insertado con ID: ${resultado.insertId}`);
    return resultado.insertId;
  } catch (error) {
    console.error("Error al insertar producto:", error.message);
    throw error;
  }
}

export async function mostrarProductosPaginado(pagina = 1, limite = 4) {
  const db = await conectarBase();
  const offset = (pagina - 1) * limite;

  try {
    const qry = "SELECT * FROM productos LIMIT ? OFFSET ?";
    const [rows] = await db.execute(qry, [limite, offset]);

    const [[{ total }]] = await db.execute(
      "SELECT COUNT(*) AS total FROM productos"
    );

    return {
      productos: rows,
      total,
      totalPaginas: Math.ceil(total / limite),
      paginaActual: pagina,
    };
  } catch (error) {
    console.error("Error:", error.message);
    return { productos: [], total: 0, totalPaginas: 0, paginaActual: pagina };
  } finally {
    await db.end();
  }
}

// VENTAS
export async function obtenerVentasConDetalle() {
  const connection = await conectarBase();
  const [rows] = await connection.execute(`
		SELECT v.idVenta, v.idTicket, v.idProducto, v.cantidad, v.precio, 
				t.comprador, t.fecha, p.nombre AS nombreProducto
		FROM ventas v
		JOIN ticket t ON v.idTicket = t.idTicket
		JOIN productos p ON v.idProducto = p.idProducto
		ORDER BY v.idVenta DESC
    `);
  await connection.end();
  return rows;
}
