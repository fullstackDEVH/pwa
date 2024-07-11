// src/index.tsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
  } else {
    console.log("Notification permission denied.");
  }
};

const AppWrapper: React.FC = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return <App />;
};

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById("root")
);

// serviceWorkerRegistration.register();

// src/index.js

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    console.log("load");
    
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
} else {
  console.log("Service Worker is not supported in this browser");
}
