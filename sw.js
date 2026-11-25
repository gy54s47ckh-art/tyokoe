/* Työkoe: välimuisti, jotta sivu aukeaa ilman verkkoa ensimmäisen latauksen jälkeen. */
const VALIMUISTI = "tyokoe-v1";
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VALIMUISTI).then(c => c.addAll(["./", "./index.html"])).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(K => Promise.all(K.filter(k => k !== VALIMUISTI).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
