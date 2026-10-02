const CACHE='tai-chinh-v1058';
const STATIC=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;let u=new URL(e.request.url);if(e.request.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/aaa/')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>new Response('<h1>Không có mạng</h1><p>Mở lại khi có mạng để tải phiên bản mới.</p>',{headers:{'Content-Type':'text/html; charset=utf-8'}})));return}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{let copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res})))});
