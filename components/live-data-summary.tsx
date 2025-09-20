"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bus, Clock, MapPin, Activity, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock live bus data
const mockLiveBuses = [
  {
    id: "bus-42-001",
    route: "42",
    destination: "University Campus",
    currentStop: "City Center",
    nextStop: "Metro Hub",
    delay: 0,
    occupancy: "Medium",
    speed: 25,
  },
  {
    id: "bus-15-002",
    route: "15",
    destination: "Downtown",
    currentStop: "Shopping Mall",
    nextStop: "Park Avenue",
    delay: 3,
    occupancy: "High",
    speed: 18,
  },
  {
    id: "bus-67-003",
    route: "67",
    destination: "Airport",
    currentStop: "Transfer Point",
    nextStop: "Highway Junction",
    delay: -1,
    occupancy: "Low",
    speed: 35,
  },
]

export function LiveDataSummary() {
  const [liveBuses, setLiveBuses] = useState(mockLiveBuses)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
     const interval = setInterval(() => {
       setLiveBuses((prev) =>
        prev.map((bus) => ({
           ...bus,
           delay: Math.max(-2, Math.min(5, bus.delay + (Math.random() - 0.5) * 2)),
           speed: Math.max(10, bus.speed + (Math.random() - 0.5) * 8),
           occupancy: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
         })),
       )
       setLastUpdate(new Date())
     }, 4000)

     return () => clearInterval(interval)
   }, [])

  const getDelayColor = (delay: number) => {
    if (delay <= 0) return "text-green-600"
    if (delay <= 2) return "text-yellow-600"
    return "text-red-600"
  }

  const getOccupancyColor = (occupancy: string) => {
    switch (occupancy) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Live Bus Updates
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              Live
            </Badge>
            <Link href="/live-tracking">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Full View
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Real-time tracking of active buses • Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {liveBuses.map((bus) => (
            <div key={bus.id} className="border rounded-lg p-4 space-y-3">
              {/* Bus Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
                    Route {bus.route}
                  </Badge>
                  <div>
                    <div className="font-medium text-sm">{bus.destination}</div>
                    <div className="text-xs text-muted-foreground">ID: {bus.id}</div>
                  </div>
                </div>
                <Badge className={getOccupancyColor(bus.occupancy)}>{bus.occupancy}</Badge>
              </div>

              {/* Location & Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">At: {bus.currentStop}</div>
                    <div className="text-muted-foreground">Next: {bus.nextStop}</div>
                  </div>
                </div>

                 <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className={`font-medium ${getDelayColor(bus.delay)}`}>
                      {bus.delay > 0
                        ? `+${bus.delay} min late`
                        : bus.delay < 0
                          ? `${Math.abs(bus.delay)} min early`
                          : "On time"}
                    </div>
                    <div className="text-muted-foreground">{bus.speed} mph</div>
                  </div>
                </div> 

                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Active</div>
                    <div className="text-muted-foreground">In service</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
