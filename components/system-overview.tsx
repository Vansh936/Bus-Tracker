"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bus, MapPin, Clock, Users, TrendingUp } from "lucide-react"

export function SystemOverview() {
  const [systemStats, setSystemStats] = useState({
    activeBuses: 127,
    totalRoutes: 15,
    avgDelay: 2.3,
    ridership: 8542,
    systemStatus: "operational",
    lastUpdate: new Date(),
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        ...prev,
        activeBuses: prev.activeBuses + Math.floor(Math.random() * 3) - 1,
        avgDelay: Math.max(0, prev.avgDelay + (Math.random() - 0.5) * 0.5),
        ridership: prev.ridership + Math.floor(Math.random() * 20) - 10,
        lastUpdate: new Date(),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "delayed":
        return "bg-yellow-500"
      case "disrupted":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "All Systems Operational"
      case "delayed":
        return "Minor Delays"
      case "disrupted":
        return "Service Disruptions"
      default:
        return "Unknown Status"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Active Buses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
          <Bus className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{systemStats.activeBuses}</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 inline mr-1" />
            +3 from yesterday
          </p>
        </CardContent>
      </Card>

      {/* Total Routes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
          <MapPin className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{systemStats.totalRoutes}</div>
          <p className="text-xs text-muted-foreground">All routes operational</p>
        </CardContent>
      </Card>

      {/* Average Delay */}
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Delay</CardTitle>
          <Clock className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{systemStats.avgDelay.toFixed(1)} min</div>
          <p className="text-xs text-muted-foreground">Within acceptable range</p>
        </CardContent>
      </Card> */}

      {/* Daily Ridership */}
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Ridership</CardTitle>
          <Users className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{systemStats.ridership.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 inline mr-1" />
            +12% from last week
          </p>
        </CardContent>
      </Card> */}

      {/* System Status - Full Width */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStats.systemStatus)} animate-pulse`} />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-lg font-semibold text-foreground">{getStatusText(systemStats.systemStatus)}</div>
              <div className="text-sm text-muted-foreground">
                Last updated: {systemStats.lastUpdate.toLocaleTimeString()}
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              Live Data
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
