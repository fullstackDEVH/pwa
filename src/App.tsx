// src/App.tsx

import React, { useEffect } from "react";

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    alert("granted");
  } else {
    console.log("Notification permission denied.");
    alert("denied");
  }
};

const App: React.FC = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const handlePushNotificationClick = async () => {
 

    const res = await fetch("https://node-pwa-peach.vercel.app/sendNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Hello!",
        body: "This is a test notification.",
      }),
    });
    console.log(await res.json());
  };

  useEffect(() => {
    // setInterval(handlePushNotificationClick, 5000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Push Notifications with React</h1>
        <button onClick={handlePushNotificationClick}>Gửi thông báo</button>
      </header>
    </div>
  );
};

export default App;
