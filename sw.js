const CACHE_NAME = "hs-score-v1-2-0";
const APP_SHELL = ["./","./index.html","./manifest.json","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==self.location.origin)return;e.respondWith(fetch(r,{cache:"no-store"}).then(resp=>{if(resp.ok){const cp=resp.clone();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.put(r,cp)))}return resp}).catch(()=>caches.match(r).then(c=>c||caches.match("./index.html"))))});
