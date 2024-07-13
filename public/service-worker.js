// public/service-worker.js

// const cacheAssest = [
//   "index.html"
// ]

self.addEventListener("push", function (event) {
  console.log("event : ", event);

  const options = {
    body: event.data ? event.data.text() : "No payload",
    icon: "icon.png", // Thay thế bằng đường dẫn tới icon của bạn
    badge: "badge.png", // Thay thế bằng đường dẫn tới badge của bạn
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

self.addEventListener("install", (event) => {
  // Perform install steps, cache here
  console.log("Service Worker installing.", event);
});

self.addEventListener("message", (event) => {
  console.log("skip waiting : ", event);
  if (event.data && event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log(cacheNames);

      return Promise.all(
        cacheNames.map((cacheName) => {
          // If the cache name doesn't match your current cache name, delete it
          if (cacheName !== "your-current-cache-name") {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  const notificationData = event.notification.data;
  event.waitUntil(
    (async () => {
      console.log(notificationData);
      if (notificationData && notificationData.url) {
        // Get all the Window clients
        const allClients = await self.clients.matchAll({
          type: "window",
          includeUncontrolled: true,
        });
        console.log("allClients : ", allClients);

        // Check if there's already a window/tab open with your URL
        const matchingClient = allClients.find((client) => {
          return client.url === notificationData.url;
        });

        if (matchingClient) {
          // Focus the existing window/tab
          return matchingClient.focus();
        } else {
          // Open a new window/tab with the URL
          return self.clients.openWindow(notificationData.url);
        }
      }
    })()
  );

  // Log to the console for debugging purposes
  console.log("Notification clicked:", notificationData);
});
