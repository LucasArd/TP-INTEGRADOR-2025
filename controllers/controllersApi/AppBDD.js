import mysql from 'mysql2/promise';

async function conectarBase() {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'justpickit'
        });

        console.log('Conexión exitosa a la base de datos');
        return db;
    } catch (err) {
        console.error('Error:', err.message);
    }
}

export async function initDB() {
    const db = await conectarBase();

    try{
        let qry = 'drop table productos';
        let resultado = await db.execute(qry);

        console.log("Tabla Productos eliminada");
    }catch(err){console.error('Error(1):', err.message);}
    
    try{
        let qry = `CREATE TABLE productos (
        idProductos bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        nombre varchar(50) NOT NULL,
        tipo varchar(50) NOT NULL,
        talle set('35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50') NOT NULL,
        color varchar(30) NOT NULL,
        img varchar(200) NOT NULL,
        url varchar(200) NOT NULL,
        precio double(30,2) NOT NULL,
        tipoBotin varchar(50) DEFAULT NULL,
        tipoZapatilla varchar(50) DEFAULT NULL,
        largoTapones varchar(30) DEFAULT NULL,
        PRIMARY KEY (idProductos) USING BTREE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`;
        let resultado = await db.execute(qry);
        console.log("Tabla Productos Creada");

    }catch(err){console.error('Error(2):', err.message);}

    try{
        let qry = `INSERT INTO productos (nombre, tipo, talle, color, img, url, precio, tipoBotin, tipoZapatilla, largoTapones) VALUES ('Adidas Ultraboost 22','Zapatilla','43,44,45','Blanco','imagenes/ultraboost22.jpg','https://mimarca.com/productos/ultraboost22',22999.00,NULL,'Running',NULL);`;
        let resultado = await db.execute(qry);

        console.log("Producto insertado correctamente");
    }catch(err){console.error('Error(3):', err.message);}
    try {
        const productos = await mostrarProductos(db);
        console.log(productos[0]);
    } catch (error) {

    }finally{
        await db.end();
    }

}

async function mostrarProductos(db) {
    const qry = 'select * from productos';
    const resultado = await db.execute(qry);

    return resultado;
}

//HACER FUNCIONES PARA PARSEAR DATOS



