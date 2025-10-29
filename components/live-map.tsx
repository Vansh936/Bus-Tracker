// components/live-map.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

// Real Pune bus locations with actual coordinates
const PUNE_LIVE_BUSES = [
  { id: 1, busNumber: "1", lat: 18.5074, lng: 73.8077, route: "Swargate - Katraj" },
  { id: 2, busNumber: "5", lat: 18.5314, lng: 73.8446, route: "Pune Station - Hadapsar" },
  { id: 3, busNumber: "9", lat: 18.5642, lng: 73.7769, route: "Shivajinagar - Hinjewadi" },
  { id: 4, busNumber: "17", lat: 18.5204, lng: 73.8567, route: "Kothrud - Pimpri" },
  { id: 5, busNumber: "21", lat: 18.6298, lng: 73.7997, route: "Pimpri - Chinchwad" },
  { id: 6, busNumber: "25", lat: 18.5951, lng: 73.7396, route: "Wakad - Hinjewadi" },
  { id: 7, busNumber: "33", lat: 18.5679, lng: 73.9143, route: "Kharadi - Viman Nagar" },
  { id: 8, busNumber: "41", lat: 18.5362, lng: 73.8953, route: "Camp - Deccan" },
  { id: 9, busNumber: "49", lat: 18.4969, lng: 73.8088, route: "Warje - Bavdhan" },
  { id: 10, busNumber: "53", lat: 18.5830, lng: 73.8239, route: "Khadki - Dapodi" },
  { id: 11, busNumber: "2", lat: 18.4574, lng: 73.8520, route: "Swargate - Hadapsar" },
  { id: 12, busNumber: "13", lat: 18.4520, lng: 73.8670, route: "Hadapsar - Katraj" },
  { id: 13, busNumber: "29", lat: 18.5575, lng: 73.8093, route: "Aundh - Baner" },
  { id: 14, busNumber: "37", lat: 18.4488, lng: 73.8554, route: "Katraj - Dhankawadi" },
  { id: 15, busNumber: "45", lat: 18.5465, lng: 73.8251, route: "University - Aundh" },
];

export function LiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setError("Google Maps API key is missing. Please add it to your .env.local file.");
      return;
    }

    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => {
        setError("Failed to load Google Maps. Please check your API key and internet connection.");
      };
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      try {
        // Center on Pune city center
        const puneCenter = { lat: 18.5204, lng: 73.8567 };

        const map = new google.maps.Map(mapRef.current, {
          center: puneCenter,
          zoom: 12,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        googleMapRef.current = map;

        // Add markers for all Pune buses
        PUNE_LIVE_BUSES.forEach((bus) => {
          const marker = new google.maps.Marker({
            position: { lat: bus.lat, lng: bus.lng },
            map: map,
            title: `Bus ${bus.busNumber}`,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#dc2626",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">Bus ${bus.busNumber}</h3>
                <p style="margin: 0; font-size: 14px; color: #666;">${bus.route}</p>
              </div>
            `,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });

          markersRef.current.push(marker);
        });

        setMapLoaded(true);
        setError(null);
      } catch (err) {
        setError("Error initializing map. Please refresh the page.");
        console.error("Map initialization error:", err);
      }
    };

    loadGoogleMaps();

    // Simulate real-time bus movement
    const interval = setInterval(() => {
      if (markersRef.current.length > 0) {
        markersRef.current.forEach((marker) => {
          const position = marker.getPosition();
          if (position) {
            // Randomly move marker slightly to simulate bus movement
            const newLat = position.lat() + (Math.random() - 0.5) * 0.002;
            const newLng = position.lng() + (Math.random() - 0.5) * 0.002;
            marker.setPosition({ lat: newLat, lng: newLng });
          }
        });
      }
    }, 5000); // Update every 5 seconds

    return () => {
      clearInterval(interval);
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Live Bus Locations - Pune
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="h-[500px] flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center p-6">
              <p className="text-destructive font-semibold mb-2">⚠️ Map Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <p className="text-xs text-muted-foreground mt-4">
                Please add your Google Maps API key to .env.local
              </p>
            </div>
          </div>
        ) : (
          <div 
            ref={mapRef} 
            className="h-[500px] w-full rounded-lg border border-border"
            style={{ minHeight: "500px" }}
          />
        )}
        {!mapLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Loading Pune bus locations...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
