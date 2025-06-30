import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function generarJWT(payload) {
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
  return token;
}

export async function verificarJWT(token) {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    return payload;
  } catch (e) {
    console.log("Firma invalida o Token Expirado");
    return null;
  }
}

export function esperarTecla() {
  console.log("Presionar tecla para continuar");
  return new Promise((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      resolve();
    });
  });
}

export async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/");
  }

  const payload = await verificarJWT(token);
  if (!payload) {
    res.clearCookie("token");
    return res.redirect("/");
  }

  req.user = payload;
  next();
}
