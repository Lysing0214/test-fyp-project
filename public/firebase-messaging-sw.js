importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB1SLHbcGnlFp13IzjoUxUxnZfQ4VgFMNQ",
  authDomain: "fir-9-testing-5a606.firebaseapp.com",
  projectId: "fir-9-testing-5a606",
  storageBucket: "fir-9-testing-5a606.appspot.com", // ✅ Fix incorrect URL
  messagingSenderId: "1066059029663",
  appId: "1:1066059029663:web:4f222734019b26389556aa",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  self.registration.showNotification(payload.notification?.title || "No Title", {
    body: payload.notification?.body || "No Body",
    icon: "/vercel.svg",
  });
});
