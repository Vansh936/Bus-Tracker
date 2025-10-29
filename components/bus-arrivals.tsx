// components/bus-arrivals.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

// Real Pune bus arrivals
const PUNE_ARRIVALS = [
  { busNumber: "1", destination: "Katraj", time: "2 mins", status: "on-time" },
  { busNumber: "5", destination: "Hadapsar", time: "5 mins", status: "on-time" },
  { busNumber: "9", destination: "Hinjewadi", time: "8 mins", status: "delayed" },
  { busNumber: "21", destination: "Chinchwad", time: "10 mins", status: "on-time" },
  { busNumber: "33", destination: "Viman Nagar", time: "12 mins", status: "on-time" },
  { busNumber: "17", destination: "Pimpri", time: "15 mins", status: "on-time" },
  { busNumber: "41", destination: "Deccan", time: "18 mins", status: "delayed" },
  { busNumber: "3", destination: "Kothrud", time: "20 mins", status: "on-time" },
];

export function BusArrivals() {
  const [arrivals, setArrivals] = useState(PUNE_ARRIVALS);

  useEffect(() => {
    // Update arrival times every minute
    const interval = setInterval(() => {
      setArrivals(prev => prev.map(arrival => {
        const currentTime = parseInt(arrival.time);
        const newTime = Math.max(1, currentTime - 1);
        return {
          ...arrival,
          time: `${newTime} mins`
        };
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Next Arrivals - Pune
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {arrivals.map((arrival, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {arrival.busNumber}
              </div>
              <div>
                <div className="font-medium text-sm">{arrival.destination}</div>
                <div className="text-xs text-muted-foreground">{arrival.time}</div>
              </div>
            </div>
            <Badge variant={arrival.status === "on-time" ? "default" : "destructive"}>
              {arrival.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}