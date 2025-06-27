
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

  const talles = tallesInput
    .split(",")
    .map(t => parseInt(t.trim()))
    .filter(t => !isNaN(t));

  if (talles.length === 0) {
    throw new Error("Ningún talle válido fue ingresado.");
  }

  const fueraDeRango = talles.find(t => t < 30 || t > 50);
  if (fueraDeRango !== undefined) {
    throw new Error("Todos los talles deben estar entre 30 y 50.");
  }

  const duplicados = talles.some((t, i) => talles.indexOf(t) !== i);
  if (duplicados) {
    throw new Error("No debe haber talles repetidos.");
  }

  return talles;
}

export function validarTamanioTapones(valor) {
  if (!valor) return true; // Permitir vacío si no es obligatorio
  const valoresValidos = ["largo", "mediano", "corto"];
  return valoresValidos.includes(valor.toLowerCase());
}