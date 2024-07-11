if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

/*

    Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
  } else {
    console.log('Notification permission denied.');
  }
});

*/
