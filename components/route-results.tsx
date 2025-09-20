"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, ArrowRight, Bus } from "lucide-react"

// Mock route data
const mockRoutes = [
  {
    id: 1,
    routeNumber: "42",
    duration: "28 min",
    price: "$3.50",
    departureTime: "8:15 AM",
    arrivalTime: "8:43 AM",
    transfers: 0,
    stops: ["Downtown Station", "City Center", "University Campus"],
    walkingTime: "5 min",
  },
  {
    id: 2,
    routeNumber: "15 → 67",
    duration: "35 min",
    price: "$4.25",
    departureTime: "8:12 AM",
    arrivalTime: "8:47 AM",
    transfers: 1,
    stops: ["Downtown Station", "Metro Hub", "Transfer Point", "University Campus"],
    walkingTime: "8 min",
  },
  {
    id: 3,
    routeNumber: "23",
    duration: "42 min",
    price: "$3.50",
    departureTime: "8:20 AM",
    arrivalTime: "9:02 AM",
    transfers: 0,
    stops: ["Downtown Station", "Shopping Mall", "Residential Area", "University Campus"],
    walkingTime: "3 min",
  },
]

export function RouteResults() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Available Routes</h3>
        <p className="text-muted-foreground text-sm">
          Found {mockRoutes.length} routes from Downtown Station to University Campus
        </p>
      </div>

      <div className="space-y-4">
        {mockRoutes.map((route) => (
          <Card key={route.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
                    Route {route.routeNumber}
                  </Badge>
                  {route.transfers > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {route.transfers} transfer{route.transfers > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-accent">{route.price}</div>
                  <div className="text-sm text-muted-foreground">{route.duration}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Time Information */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{route.departureTime}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{route.arrivalTime}</span>
                </div>
                <div className="text-sm text-muted-foreground">{route.walkingTime} walking</div>
              </div>

              {/* Route Stops */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Route stops</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {route.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <span className="text-sm bg-muted px-2 py-1 rounded text-muted-foreground">{stop}</span>
                      {index < route.stops.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm">
                <Bus className="h-4 w-4 mr-2" />
                Select This Route
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
