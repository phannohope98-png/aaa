const CACHE='tai-chinh-v10-2-6-code-refresh';
const STATIC=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(new Request(event.request,{cache:'no-store'})).then(r=>{
      if(r&&r.ok)caches.open(CACHE).then(c=>c.put('./index.html',r.clone()));
      return r;
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(new Request(event.request,{cache:'no-store'})).then(r=>{
    if(r&&r.ok)caches.open(CACHE).then(c=>c.put(event.request,r.clone()));
    return r;
  }).catch(()=>caches.match(event.request)));
});
