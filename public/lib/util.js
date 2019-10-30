/** Muestra una instancia de Error en la consola y muestra un diálogo
 * alert con la propiedad message del objeto.
 * @param {Error} e instancia que contiene el error. */
export function error(e) {
  console.error(e);
  alert(e.message);
}
 
/** Codifica un texto para que escape los caracteres especiales para que no se
 * pueda interpretar como HTML.
 * @param {*} texto
 * @returns {string} un texto que no puede interpretarse como HTML. */
export function cod(texto) {
  let div = document.createElement('div');
  div.innerText = (texto||"").toString();
  return div.innerHTML;
}
 
/** Codifica una url para su uso en html.
 * @param {string} u url codificada. */
export function url(u) {
  return cod(encodeURIComponent(u));
}
