"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ArrowUpDown } from "lucide-react"

export function RouteForm() {
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")

  const handleSwapLocations = () => {
    const temp = fromLocation
    setFromLocation(toLocation)
    setToLocation(temp)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching routes:", { fromLocation, toLocation })
    // In a real app, this would trigger route search
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Journey Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Location Inputs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="Enter starting location or bus stop"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSwapLocations}
                className="rounded-full p-2 bg-transparent"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="Enter destination or bus stop"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!fromLocation || !toLocation}
          >
            Find Routes
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
