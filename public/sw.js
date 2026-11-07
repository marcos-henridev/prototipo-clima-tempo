const CACHE_NAME = "clima-tempo-cache-v2";
const URL_CACHE = [
  "/",
  "/manifest.webmanifest",
  "/IconsManifest/mobile.png",
  "/IconsManifest/desjktop.png",
  "/IconsManifest/icon-192.png",
  "/IconsManifest/icon.svg",
];

//1. install service worker (ideal para cache inicial)
self.addEventListener("install", (event) => {
  console.log("service worker instalado");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URL_CACHE)),
  );
});

//2. actived - ativado apos a instalação. (pode limpar caches antigos)
self.addEventListener("activate", (event) => {
  console.log("service worker ativado");

  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      ),
  );
});

//3. fetch - Interceptar todas as requisições da página e decide como responde-las
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request)),
  );
});
