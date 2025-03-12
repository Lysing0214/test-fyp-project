"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../../../firebaseConfig"; // Ensure correct path

export default function Notifications() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const messaging = getMessaging(app);

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("Service Worker registered:", registration);

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey: "BHGZZEXQtxtQ-oYK7UUtWKp0iKLkhC7rDdQqUBzPkii8fr6iQl47ehQuJRf0aBvfHCLuhEVh93BewVUzUlY7Hkc",
            serviceWorkerRegistration: registration, // ✅ Pass the registration
          });
          if (currentToken) {
            setToken(currentToken);
            console.log("FCM Token:", currentToken);
          } else {
            console.warn("Failed to get FCM token");
          }
        } else {
          console.warn("Push notification permission denied");
        }
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    };

    registerServiceWorker();

    // Handle foreground messages
    onMessage(messaging, async (payload) => {
      console.log("Message received:", payload);

      if (payload.notification) {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            registration.showNotification(payload.notification.title || "No Title", {
              body: payload.notification.body || "No Body",
              icon: "/vercel.svg",
            });
          } else {
            console.warn("No service worker registration found.");
          }
        } catch (error) {
          console.error("Error displaying notification:", error);
        }
      } else {
        console.warn("Received message without a notification payload:", payload);
      }


    });

    console.log("Is Standalone Mode:", window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Push Notifications</h1>
      <p>Token: {token}</p>
    </div>
  );
}
