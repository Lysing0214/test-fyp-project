"use client";
import React, { useState, useEffect } from "react";
import Map from "./Map";
import { ref, onValue, database } from "../../../firebaseConfig";

const GoogleMapPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyUsers, setNearbyUsers] = useState<{ lat: number; lng: number; role: string }[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);

          // Simulating nearby users (You need to replace this with real data from your backend)
          setNearbyUsers([
            { lat: location.lat + 0.001, lng: location.lng + 0.001, role: "mechanic" },
            { lat: location.lat - 0.001, lng: location.lng - 0.001, role: "vehicle_owner" },
          ]);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  if (!userLocation) {
    return <p>Loading map...</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Find Nearby Repair Shops</h1>
      <Map userLocation={userLocation} nearbyUsers={nearbyUsers} />
    </div>
  );
};

export default GoogleMapPage;
