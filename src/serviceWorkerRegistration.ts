// src/serviceWorkerRegistration.ts
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function registerPushManager(registration: ServiceWorkerRegistration) {
  console.log("registration : ", registration);
  console.log(registration.pushManager.getSubscription());

  registration.pushManager
    .getSubscription()
    .then((subscription) => {
      console.log(subscription);

      if (subscription === null) {
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BMHXipBHt-A4qkUW4CJAhY9Tz5u2aETHQrjdC2abao18-EfiLCFaFTf4CPz2TBdkmgDR7xxOHr2WyILu_Hf5TOI"
          ),
        });
      } else {
        return subscription;
      }
    })
    .then((subscription) => {
      console.log("Subscribed:", subscription);
      // Gửi subscription về server để lưu
      fetch("https://node-pwa-peach.vercel.app/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });
    })
    .catch((error) => {
      console.error("PushManager subscription failed:", error);
    });
}

export function register(config?: Config) {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              alert("New update available");
              console.log(
                "New content is available and will be used when all tabs for this page are closed."
              );
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
              notifyUserAboutUpdate(installingWorker);
            } else {
              console.log("Content is cached for offline use.");
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
      registerPushManager(registration);
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}

function notifyUserAboutUpdate(installingWorker: ServiceWorker) {
  console.log("installingWorker : ", installingWorker);

  if (
    confirm("A new version of the app is available. Do you want to update?")
  ) {
    installingWorker.postMessage({ action: "skipWaiting" });
  }
}
