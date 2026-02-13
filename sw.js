const CACHE_NAME = 'photobrick-v2.3.7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js'
];

// Установка сервис-воркера и кеширование файлов
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Работа офлайн: отдаем файлы из кеша, если нет интернета
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );

});




