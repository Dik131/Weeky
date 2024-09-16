const CACHE_NAME = 'weeky-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/site.webmanifest',
  '/src/main.jsx',
  '/src/App.css',
  '/src/index.css',
  '/src/index.js',
  '/src/App.jsx',
  '/src/components/DayAccordion.jsx',
  '/src/components/DayAccordion.module.css',
  '/src/components/TaskBlock.jsx',
  '/src/components/TaskBlock.module.css',
  '/src/components/TaskItem.jsx',
  '/src/components/TaskItem.module.css',
  '/src/components/MonthTodoList.jsx',
  '/src/components/MonthTodoList.module.css',
  '/src/components/PercentageCounter.jsx',
  '/src/components/PercentageCounter.module.css',
  '/src/components/ThemeSwitch.jsx',
  '/src/components/ThemeSwitch.module.css',
  '/src/components/Trashcan.jsx',
  '/src/components/Trashcan.module.css',
  '/src/redux/slices/tasksSlice.js',
  '/src/redux/slices/toggleThemeSlice.js',
  '/src/redux/slices/trashcanSlice.js',
  '/src/redux/store.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
