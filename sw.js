const CACHE_NAME = 'estudio-arte-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icono.png'
];

// Instalación: Guarda los archivos esenciales en la memoria del iPad
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta las peticiones: Si no hay internet, entrega la versión guardada
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo en caché si existe, si no, lo busca en internet
        return response || fetch(event.request);
      })
  );
});