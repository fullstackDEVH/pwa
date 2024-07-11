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
