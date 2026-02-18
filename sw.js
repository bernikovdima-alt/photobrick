// --- КОНФИГУРАЦИЯ ---

// ВАЖНО: Каждый раз, когда вы обновляете код сайта (HTML, CSS, JS),
// меняйте эту строку! Например: 'app-v2', 'app-v3' и т.д.
// Браузер увидит изменение в этом байте и поймет, что нужно обновиться.
const CACHE_NAME = 'app-v2.4.2-render'; 

// Список файлов, которые нужно закешировать сразу
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    // Добавьте сюда иконки или другие файлы, если есть:
    // './manifest.json',
    './icon.png'
];

// --- 1. УСТАНОВКА (INSTALL) ---
self.addEventListener('install', (event) => {
    // [МЕТОД 3 - Часть 1]
    // Эта команда говорит браузеру: "Не жди, пока пользователь закроет все вкладки.
    // Активируй этот Service Worker прямо сейчас!"
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Кэширование файлов');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// --- 2. АКТИВАЦИЯ (ACTIVATE) ---
self.addEventListener('activate', (event) => {
    // [МЕТОД 3 - Часть 2]
    // Эта команда говорит: "Начни контролировать все открытые вкладки немедленно".
    // Без этого пользователь увидел бы обновление только после перезагрузки страницы.
    event.waitUntil(self.clients.claim());

    // Удаляем старые кэши, чтобы не занимать место и не отдавать старье
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[SW] Удаление старого кэша:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// --- 3. ПЕРЕХВАТ ЗАПРОСОВ (FETCH) ---
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Если файл есть в кэше — отдаем его
                if (response) {
                    return response;
                }
                // Если нет — качаем из сети
                return fetch(event.request);
            })
    );
});




