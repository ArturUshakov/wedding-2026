const CACHE = 'wedding-v1';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './main.js',
    './manifest.webmanifest',
    './assets/hero.webp',
    './assets/intro.webp',
    './assets/countdown.webp',
    './assets/story1_child.webp',
    './assets/story2_child.webp',
    './assets/story3_now.webp',
    './assets/story4_now2.webp',
    './assets/music.mp3',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.map(k => (k === CACHE ? null : caches.delete(k)))))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Only handle same-origin
    if (url.origin !== self.location.origin) return;

    // HTML: network-first (чтобы обновления прилетали)
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req).then(res => {
                const copy = res.clone();
                caches.open(CACHE).then(c => c.put('./index.html', copy));
                return res;
            }).catch(() => caches.match('./index.html'))
        );
        return;
    }

    // Assets: cache-first
    event.respondWith(
        caches.match(req).then(cached => cached || fetch(req).then(res => {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
            return res;
        }))
    );
});