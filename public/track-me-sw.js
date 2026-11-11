/* Track Me install helper. No offline cache, no private data interception. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

/* Track Me V31: Web Push, no private content caching. */
self.addEventListener('push', event => {
  event.waitUntil(self.registration.showNotification("Ahsan's Updates", {
    body: "It's been a week! ❤️ Catch up on Ahsan's updates whenever you're free.",
    icon: '/track-me-icon-v29-192.png',
    badge: '/track-me-icon-v29-192.png',
    tag: 'ahsan-family-7-day-reminder', data: {url:'/track-me'}
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const url = new URL('/track-me', self.location.origin).href;
    const clients = await self.clients.matchAll({type:'window',includeUncontrolled:true});
    const open = clients.find(client => {try {return new URL(client.url).pathname==='/track-me';}catch{return false;}});
    if(open) return open.focus();
    return self.clients.openWindow(url);
  })());
});
