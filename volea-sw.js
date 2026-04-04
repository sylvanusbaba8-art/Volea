// Service Worker VOLEA — Firebase Cloud Messaging
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAKT6pXp50lyzfgUZ7UWkVJEmTBvnCPQPU",
  authDomain: "volea-gestion.firebaseapp.com",
  projectId: "volea-gestion",
  storageBucket: "volea-gestion.firebasestorage.app",
  messagingSenderId: "1034710258679",
  appId: "1:1034710258679:web:4de9528e074d373af014f2"
});

const messaging = firebase.messaging();

// Afficher la notification en background
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'VOLEA', {
    body: body || 'Vous avez un nouveau message.',
    icon: icon || '/icon-volea.png',
    badge: '/icon-volea.png',
    data: payload.data || {},
    actions: [
      { action: 'ouvrir', title: 'Ouvrir VOLEA' }
    ]
  });
});

// Clic sur la notification — ouvrir l'app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('volea') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://sylvanusbaba8-art.github.io/Volea');
    })
  );
});
