// "use client";
// import { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { ref, set, onValue } from "../../../firebaseConfig";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000"); // Update to your backend URL

// const MapPage = () => {
//   const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition((position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         setLocation({ lat, lng });

//         // Update Firebase location
//         const userId = "user_123"; // Replace with real user ID
//         set(ref(database, `locations/${userId}`), { lat, lng });

//         // Emit location via Socket.io
//         socket.emit("update-location", { userId, lat, lng });
//       });
//     }
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap mapContainerStyle={{ width: "100%", height: "500px" }} center={location} zoom={15}>
//         <Marker position={location} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapPage;
