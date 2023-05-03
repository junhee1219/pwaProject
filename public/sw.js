importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'
);

// This is your Service Worker, you can put any of your custom Service Worker
// code in this file, above the `precacheAndRoute` line.

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// 푸시 알림 수신 이벤트 처리
self.addEventListener('push', function(event) {
    console.log('Push received:', event);
  
    var title = 'Your Title';
    var options = {
      body: 'Your Message',
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  // 클릭 이벤트 핸들러 등록
  self.addEventListener('notificationclick', function(event) {
    console.log('Notification clicked:', event);
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow('https://clinquant-gecko-11b206.netlify.app/')
    );
  });
  