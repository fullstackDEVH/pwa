// public/service-worker.js
self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("service worker event : ", event);
  console.log("service worker data : ", data);

  const options = {
    body: data.body,
    icon: "icon.png",
    badge: "badge.png",
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  const notificationData = event.notification.data;

  if (notificationData && notificationData.url) {
    self.clients.openWindow(notificationData.url);
  }

  event.notification.close();
});
