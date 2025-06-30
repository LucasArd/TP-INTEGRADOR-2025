import ejs from "ejs";
import PATHS from "../../paths/paths.js";
import { conectarBase } from "../controllersApi/AppBDD.js";

export async function dashboard(req, res) {
  let html = await ejs.renderFile(PATHS.dashboardView);
  res.status(200).send(html);
}

export async function viewAlta(req, res) {
  let html = await ejs.renderFile(PATHS.altaView, { abm: "A" });
  res.status(200).send(html);
}

export async function viewBaja(req, res) {
  let html = await ejs.renderFile(PATHS.dashboardView, { abm: "B" });
  res.status(200).send(html);
}

export async function viewLogin(req, res) {
  let html = await ejs.renderFile(PATHS.loginView);
  res.status(200).send(html);
}

export async function viewMod(req, res) {
  const idProducto = parseInt(req.params.idProducto);
  const response = await fetch("http://localhost:3000/api/productos/todos");
  const data = await response.json();
  console.log(data);

  const producto = data.productos.find((p) => p.idProducto === idProducto);

  if (!producto) {
    return res.status(404).send("Producto no encontrado");
  }

  let html = await ejs.renderFile(PATHS.modificarView, { abm: "M", producto });
  res.status(200).send(html);
}

export async function obtenerHtmlTicket(idTicket, mostrarBoton) {
  const db = await conectarBase();
  try {
    const [rows] = await db.query("SELECT * FROM ticket WHERE idTicket = ?", [
      idTicket,
    ]);
    const ticket = rows[0];

    if (!ticket) throw new Error("Ticket no encontrado");

    const [productos] = await db.query(
      `
            SELECT p.nombre, p.precio, v.cantidad, (v.cantidad * v.precio) AS subtotal
            FROM ventas v JOIN productos p ON v.idProducto = p.idProducto
            WHERE v.idTicket = ?`,
      [idTicket]
    );

    const html = await ejs.renderFile(PATHS.ticketView, {
      ticket,
      productos,
      mostrarBoton,
    });
    return html;
  } finally {
    await db.end();
  }
}

export async function ticketView(req, res) {
  const idTicket = req.params.id;
  try {
    const html = await obtenerHtmlTicket(idTicket, true); //Va true o false, para elegir si muestro o no los botones
    res.status(200).send(html);
  } catch (error) {
    console.error("Error obteniendo ticket:", error);
    res.status(500).send(`No se encontro el ticket con id: ${idTicket}`);
  }
}

export async function viewVentas(req, res) {
  let html = await ejs.renderFile(PATHS.ventasView);
  res.status(200).send(html);
}
