
export function validarNombreUsuario(nombre) {
  const nombreLimpio = nombre.trim();

  if (nombreLimpio === "") {
    return { valido: false, mensaje: "Ingrese un nombre" };
  }

  if (nombreLimpio.length > 20) {
    return { valido: false, mensaje: "El nombre no debe superar los 20 caracteres" };
  }

  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!regex.test(nombreLimpio)) {
    return { valido: false, mensaje: "El nombre solo debe contener letras y espacios" };
  }

  return { valido: true, nombre: nombreLimpio };
}

export function validarString(color) {
  // Acepta letras y espacios, entre 3 y 20 caracteres
  const regex = /^[a-zA-Z\s]{3,20}$/;
  return regex.test(color.trim());
}

export function validarPrecio(precio) {
  const numero = parseFloat(precio);
  return !isNaN(numero) && numero > 0;
}

export function validarTalle(tallesInput) {
  if (typeof tallesInput !== "string" || tallesInput.trim() === "") {
    throw new Error("Debe ingresar al menos un talle.");
  }

  if (!/^\s*\d{2}(\s*,\s*\d{2})*\s*$/.test(tallesInput)) {
    throw new Error("Los talles deben ingresarse como números separados por comas, por ejemplo: 36,37,38.");
  }

  const talles = tallesInput.split(',').map(t => t.trim());

  if (talles.length === 0) {
    throw new Error("Ningún talle fue ingresado.");
  }

  for (let t of talles) {
    const numero = parseInt(t);
    if (isNaN(numero)) {
      throw new Error(`"${t}" no es un número válido.`);
    }
    if (numero < 30 || numero > 50) {
      throw new Error(`El talle ${numero} está fuera del rango permitido (30-50).`);
    }
  }

  const numeros = talles.map(t => parseInt(t));
  const duplicados = numeros.some((t, i) => numeros.indexOf(t) !== i);
  if (duplicados) {
    throw new Error("No debe haber talles repetidos.");
  }

  return numeros;
}

export function validarTamanioTapones(valor) {
  if (!valor || typeof valor !== "string") {
    throw new Error("El tamaño de los tapones es obligatorio.");
  }

  const valoresValidos = ["largo", "mediano", "corto"];
  if (!valoresValidos.includes(valor.toLowerCase())) {
    throw new Error("El tamaño de los tapones debe ser 'largo', 'mediano' o 'corto'.");
  }

  return true;
}