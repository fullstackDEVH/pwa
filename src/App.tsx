// src/App.tsx

import React from "react";

const App: React.FC = () => {
  const handlePushNotificationClick = () => {
    if ("serviceWorker" in navigator && Notification.permission === "granted") {
      console.log("send");
      
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Thông báo từ ứng dụng", {
          body: "Chào mừng bạn đến với ứng dụng của chúng tôi!",
          icon: "logo192.png",
          badge: "logo192.png",
        });
      });
    }
  };

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
