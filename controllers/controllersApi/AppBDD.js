import mysql from 'mysql2/promise';

async function conectarBase() {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'justpickit',
            multipleStatements: true
        });

        console.log('Conexión exitosa a la base de datos');
        return db;
    } catch (err) {console.error('Error:', err.message);}
}

async function crearDB(db){
    let qry = 'CREATE DATABASE IF NOT EXISTS justpickit;';
    let resultado = await db.query(qry); 
}

async function eliminarDB(db) {
    let qry = 'DROP DATABASE IF EXISTS justpickit;';
    let resultado = await db.query(qry);

    console.log(`Base de datos eliminada`);
}

async function crearTablas(db) {
    let qry = `CREATE TABLE productos (idProductos bigint(20) unsigned NOT NULL AUTO_INCREMENT,nombre varchar(50) NOT NULL,tipo varchar(50) NOT NULL,talle set('35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50') NOT NULL,color varchar(30) NOT NULL,img varchar(200) NOT NULL,url varchar(200) NOT NULL,precio double(30,2) NOT NULL,tipoBotin varchar(50) DEFAULT NULL,tipoZapatilla varchar(50) DEFAULT NULL,largoTapones varchar(30) DEFAULT NULL,PRIMARY KEY (idProductos)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    CREATE TABLE ticket (idTicket bigint(20) unsigned NOT NULL AUTO_INCREMENT,comprador varchar(50) NOT NULL,precioTotal double NOT NULL,fecha datetime NOT NULL DEFAULT current_timestamp(),PRIMARY KEY (idTicket),UNIQUE KEY idTicket (idTicket)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    CREATE TABLE usuarios (idUsuario bigint(20) unsigned NOT NULL AUTO_INCREMENT,nombre varchar(30) NOT NULL,contraseña varchar(30) NOT NULL,PRIMARY KEY (idUsuario)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    CREATE TABLE ventas (idVenta int(11) NOT NULL AUTO_INCREMENT,idTicket bigint(20) unsigned NOT NULL,idProducto bigint(20) unsigned NOT NULL,cantidad int(11) NOT NULL,precio double(10,2) NOT NULL,PRIMARY KEY (idVenta),FOREIGN KEY (idTicket) REFERENCES ticket(idTicket) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (idProducto) REFERENCES productos(idProductos) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    let resultado = await db.query(qry);
    
    console.log(`Base de datos con sus tablas creadas`);
}


export async function initDB() {
    const db = await conectarBase();
    
    try{
        eliminarDB(db);
    }catch(err){console.error(err.message);}

    try{
        crearDB(db);
    }catch(err){console.error(err.message);}

    try{
        await db.query('USE justpickit;');
        crearTablas(db);
    }catch(err){console.error(err.message);}

    try{
        let zapatillas = [`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Air Zoom Pegasus','Zapatilla','40,41,42','Negro','calzado-running-1.webp','https://nike.com/productos/air-zoom-pegasus',15999.00,NULL,'Running',NULL);`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike React Infinity Run','Zapatilla','38,39,40','Azul','calzado-running-1.webp','https://nike.com/productos/react-infinity-run',17999.00,NULL,'Running',NULL);`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike ZoomX Vaporfly','Zapatilla','41,42,43','Blanco','calzado-running-1.webp','https://nike.com/productos/zoomx-vaporfly',26999.00,NULL,'Running',NULL);`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Free RN 5.0','Zapatilla','39,40,41','Gris','calzado-running-1.webp','https://nike.com/productos/free-rn-5',13999.00,NULL,'Running',NULL);`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Air Max 270','Zapatilla','40,42,44','Rojo','calzado-running-1.webp','https://nike.com/productos/air-max-270',19999.00,NULL,'Running',NULL);`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Zoom Pegasus Turbo','Zapatilla','38,39,40','Negro','calzado-running-1.webp','https://nike.com/productos/zoom-pegasus-turbo',18999.00,NULL,'Running',NULL);`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Air Zoom Structure','Zapatilla','41,42,43','Azul','calzado-running-1.webp','https://nike.com/productos/air-zoom-structure',15999.00,NULL,'Running',NULL);`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike React Miler','Zapatilla','42,43,44','Blanco','calzado-running-1.webp','https://nike.com/productos/react-miler',17999.00,NULL,'Running',NULL);`];

        let botines = [`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Phantom GT','Botin','40,41,42','Negro','calzado-running-1.webp','https://nike.com/productos/phantom-gt',21999.00,'Cesped','NULL','Corto');`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Mercurial Vapor','Botin','38,39,40','Blanco','calzado-running-1.webp','https://nike.com/productos/mercurial-vapor',23999.00,'Cesped','NULL','Mediano');`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Tiempo Legend','Botin','41,42,43','Rojo','calzado-running-1.webp','https://nike.com/productos/tiempo-legend',19999.00,'Cesped','NULL','Largo');`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Phantom Vision','Botin','39,40,41','Azul','calzado-running-1.webp','https://nike.com/productos/phantom-vision',21999.00,'Sintetico','NULL','Corto');`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Premier II','Botin','40,41,42','Blanco','calzado-running-1.webp','https://nike.com/productos/premier-ii',17999.00,'Cesped','NULL','Largo');`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike React Gato','Botin','42,43,44','Negro','calzado-running-1.webp','https://nike.com/productos/react-gato',20999.00,'Sintetico','NULL','Largo');`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Magista','Botin','38,39,40','Gris','calzado-running-1.webp','https://nike.com/productos/magista',22999.00,'Sintetico','NULL','Corto');`,`INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Nike Strike','Botin','39,40,41','Azul','calzado-running-1.webp','https://nike.com/productos/strike',18999.00,'Cesped','NULL','Corto');`];
        for (const x of zapatillas) {
            let resultado = await db.execute(x);
        }
        for (const x of botines) {
            let resultado = await db.execute(x);
        }
        console.log("Producto insertado correctamente");
    }catch(err){console.error('Error(3):', err.message);

    }finally{
        await db.end();
    }

}

export async function mostrarProductos() {
    const db = await conectarBase();
    try {
        const qry = 'select * from productos';
        const [rows] = await db.execute(qry);
        
        return rows;
    } catch (error) {
        console.error('Error:', error.message);
        return [];
    }finally{
        await db.end();
    }
}

