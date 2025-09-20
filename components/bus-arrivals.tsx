"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Bus, Bell, BellOff } from "lucide-react"

// Mock arrival data
const mockArrivals = [
  {
    id: 1,
    routeNumber: "42",
    destination: "University Campus",
    stopName: "City Center Station",
    arrivals: ["2 min", "12 min", "22 min"],
    isTracked: true,
  },
  {
    id: 2,
    routeNumber: "15",
    destination: "Metro Hub",
    stopName: "Downtown Station",
    arrivals: ["5 min", "15 min", "25 min"],
    isTracked: false,
  },
  {
    id: 3,
    routeNumber: "67",
    destination: "University Campus",
    stopName: "Transfer Point",
    arrivals: ["1 min", "8 min", "18 min"],
    isTracked: true,
  },
  {
    id: 4,
    routeNumber: "23",
    destination: "Residential Area",
    stopName: "Shopping Mall",
    arrivals: ["4 min", "14 min", "24 min"],
    isTracked: false,
  },
]

export function BusArrivals() {
  const [arrivals, setArrivals] = useState(mockArrivals)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setArrivals((prevArrivals) =>
        prevArrivals.map((arrival) => ({
          ...arrival,
          arrivals: arrival.arrivals.map((time) => {
            const minutes = Number.parseInt(time)
            const newMinutes = Math.max(0, minutes - 1)
            return newMinutes === 0 ? "Arriving" : `${newMinutes} min`
          }),
        })),
      )
      setLastUpdate(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const toggleTracking = (id: number) => {
    setArrivals((prevArrivals) =>
      prevArrivals.map((arrival) => (arrival.id === id ? { ...arrival, isTracked: !arrival.isTracked } : arrival)),
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Live Arrivals
          </CardTitle>
          <p className="text-sm text-muted-foreground">Real-time bus arrival information for nearby stops</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {arrivals.map((arrival) => (
            <div key={arrival.id} className="border rounded-lg p-4 space-y-3">
              {/* Route Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
                    {arrival.routeNumber}
                  </Badge>
                  <div>
                    <div className="font-medium text-sm">{arrival.destination}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {arrival.stopName}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleTracking(arrival.id)}
                  className={arrival.isTracked ? "text-accent" : "text-muted-foreground"}
                >
                  {arrival.isTracked ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                </Button>
              </div>

              {/* Arrival Times */}
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Next arrivals:</div>
                <div className="flex gap-2">
                  {arrival.arrivals.map((time, index) => (
                    <Badge
                      key={index}
                      variant={index === 0 ? "default" : "outline"}
                      className={index === 0 ? "bg-accent text-accent-foreground" : ""}
                    >
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Live Indicator */}
              {arrival.isTracked && (
                <div className="flex items-center gap-2 text-xs text-accent">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span>Tracking notifications enabled</span>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <Bus className="h-4 w-4 mr-2" />
            Track Specific Route
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Manage Notifications
          </Button>
        </CardContent>
      </Card>

      {/* Last Update */}
      <div className="text-center text-xs text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</div>
    </div>
  )
}
