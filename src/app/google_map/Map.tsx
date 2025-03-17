"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

if (!googleMapsApiKey) {
  throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local");
}

const Map = ({
  userLocation,
  nearbyUsers,
}: {
  userLocation: { lat: number; lng: number };
  nearbyUsers: { lat: number; lng: number; role: string }[];
}) => {
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={14}>
        {/* User Marker */}
        <Marker position={userLocation} label="You" />

        {/* Nearby Users Markers */}
        {nearbyUsers.map((user, index) => (
          <Marker
            key={index}
            position={{ lat: user.lat, lng: user.lng }}
            label={user.role === "repair_shop" ? "Shop" : "Owner"}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
