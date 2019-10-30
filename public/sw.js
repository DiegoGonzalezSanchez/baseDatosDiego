const CACHE = "bddiego-9cfec";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
  "lib/document-register-element.js",
  "lib/min.js",
  "lib/polycustom.js",
  "lib/registraServiceWorker.js",
  "lib/util.js",
  "estilos.css",
  "favicon.ico",
  "icono.png",
  "index.html",
  "manifest.json",
  "mi-footer.js",
  "nombres.html",
  "nombresNuevo.html",
  "__/firebase/7.2.0/firebase-app.js",
  "__/firebase/7.2.0/firebase-firestore.js",
  "__/firebase/init.js",
  '/'
];
 
self.addEventListener("install", evt => {
  console.log("Service Worker instalado.");
  // Realiza la instalación: carga los archivos requeridos en la caché.
  // @ts-ignore
  evt.waitUntil(cargaCache());
});
 
// Toma de la caché archivos solicitados. Los otros son descargados.
self.addEventListener("fetch", evt => {
    // @ts-ignore
    if (evt.request.method === "GET") {
      // @ts-ignore
      evt.respondWith(usaCache(evt));
    }
  });
self.addEventListener("activate", () => console.log("Service Worker activo."));
 
async function cargaCache() {
  console.log("Intentando cargar cache: " + CACHE);
  const cache = await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado: " + CACHE);
}
 
async function usaCache(evt) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });
  if (response) {
    return response;
  } else {
    return fetch(evt.request);
  }
}
