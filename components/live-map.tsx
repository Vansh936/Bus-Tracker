"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Bus, RefreshCw, Zap, Search, X } from "lucide-react"

// Mock bus data with positions
const mockBuses = [
  {
    id: "bus-42-001",
    routeNumber: "42",
    busNumber: "MH12AB1234", // Added bus number field
    position: { lat: 40.7128, lng: -74.006 },
    direction: "Downtown → University",
    nextStop: "City Center",
    eta: "2 min",
    occupancy: "Medium",
    speed: 25,
  },
  {
    id: "bus-15-002",
    routeNumber: "15",
    busNumber: "MH12CD5678", // Added bus number field
    position: { lat: 40.7589, lng: -73.9851 },
    direction: "Uptown → Metro Hub",
    nextStop: "Shopping Mall",
    eta: "5 min",
    occupancy: "High",
    speed: 18,
  },
  {
    id: "bus-67-003",
    routeNumber: "67",
    busNumber: "MH12EF9012", // Added bus number field
    position: { lat: 40.7282, lng: -73.7949 },
    direction: "Metro Hub → University",
    nextStop: "Transfer Point",
    eta: "1 min",
    occupancy: "Low",
    speed: 30,
  },
  {
    id: "bus-23-004",
    routeNumber: "23",
    busNumber: "MH12GH3456", // Added bus number field
    position: { lat: 40.6892, lng: -74.0445 },
    direction: "Downtown → Residential",
    nextStop: "Park Avenue",
    eta: "4 min",
    occupancy: "Medium",
    speed: 22,
  },
]

export function LiveMap() {
  const [buses, setBuses] = useState(mockBuses)
  const [selectedBus, setSelectedBus] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("") // Added search state
  const [filteredBuses, setFilteredBuses] = useState(mockBuses) // Added filtered buses state

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBuses(buses)
    } else {
      const filtered = buses.filter(
        (bus) =>
          bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) || bus.routeNumber.includes(searchQuery),
      )
      setFilteredBuses(filtered)
    }
  }, [searchQuery, buses])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => ({
          ...bus,
          position: {
            lat: bus.position.lat + (Math.random() - 0.5) * 0.001,
            lng: bus.position.lng + (Math.random() - 0.5) * 0.001,
          },
          eta: Math.max(1, Number.parseInt(bus.eta) + (Math.random() > 0.5 ? 1 : -1)) + " min",
          speed: Math.max(10, bus.speed + (Math.random() - 0.5) * 5),
        })),
      )
      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdate(new Date())
    }, 1000)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const getOccupancyColor = (occupancy: string) => {
    switch (occupancy) {
      case "Low":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "High":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="h-[700px]">
      {" "}
      {/* Increased height to accommodate search */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Live Bus Map
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Zap className="h-3 w-3 text-accent" />
              <span>Live</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by bus number or route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          {searchQuery && (
            <Badge variant="secondary" className="text-xs">
              {filteredBuses.length} found
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</p>
      </CardHeader>
      <CardContent className="p-0">
        {/* Map Container */}
        <div className="relative h-[500px] bg-muted rounded-lg mx-6 mb-6 overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-gray-300 dark:border-gray-700" />
                ))}
              </div>
            </div>
          </div>

          {/* Bus Markers */}
          {filteredBuses.map((bus, index) => {
            // Use filteredBuses instead of buses
            const isHighlighted =
              searchQuery &&
              (bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) || bus.routeNumber.includes(searchQuery))

            return (
              <div
                key={bus.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                  selectedBus === bus.id ? "scale-125 z-20" : "z-10"
                } ${isHighlighted ? "animate-pulse" : ""}`} // Added highlight animation
                style={{
                  left: `${20 + ((index * 15) % 60)}%`,
                  top: `${20 + ((index * 20) % 60)}%`,
                }}
                onClick={() => setSelectedBus(selectedBus === bus.id ? null : bus.id)}
              >
                {/* Bus Icon */}
                <div
                  className={`relative p-2 rounded-full ${
                    selectedBus === bus.id || isHighlighted ? "bg-accent" : "bg-primary"
                  } text-white shadow-lg`} // Highlight searched buses
                >
                  <Bus className="h-4 w-4" />

                  {/* Route Number Badge */}
                  <div className="absolute -top-1 -right-1 bg-white text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {bus.routeNumber}
                  </div>

                  {/* Occupancy Indicator */}
                  <div
                    className={`absolute -bottom-1 -left-1 w-3 h-3 rounded-full ${getOccupancyColor(bus.occupancy)}`}
                  />
                </div>

                {/* Bus Info Popup */}
                {selectedBus === bus.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 min-w-[220px] border">
                    {" "}
                    // Increased width for bus number
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Route {bus.routeNumber}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{bus.speed} mph</span>
                      </div>

                      <div className="text-sm">
                        <div className="font-medium text-accent">Bus: {bus.busNumber}</div>
                      </div>

                      <div className="text-sm">
                        <div className="font-medium">{bus.direction}</div>
                        <div className="text-muted-foreground">Next: {bus.nextStop}</div>
                        <div className="text-accent font-medium">ETA: {bus.eta}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getOccupancyColor(bus.occupancy)}`} />
                        <span className="text-xs text-muted-foreground">{bus.occupancy} occupancy</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {searchQuery && filteredBuses.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Bus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No buses found matching "{searchQuery}"</p>
                <Button variant="ghost" onClick={clearSearch} className="mt-2">
                  Clear search
                </Button>
              </div>
            </div>
          )}

          {/* Route Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <pattern id="route-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="5" cy="5" r="1" fill="currentColor" className="text-primary opacity-50" />
              </pattern>
            </defs>
            {/* Route 42 */}
            <path
              d="M 20 100 Q 200 50 400 120 Q 600 200 780 180"
              stroke="url(#route-pattern)"
              strokeWidth="3"
              fill="none"
              className="text-primary opacity-30"
            />
            {/* Route 15 */}
            <path
              d="M 50 200 Q 300 150 500 250 Q 700 350 850 300"
              stroke="url(#route-pattern)"
              strokeWidth="3"
              fill="none"
              className="text-accent opacity-30"
            />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Low occupancy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>Medium occupancy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>High occupancy</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
