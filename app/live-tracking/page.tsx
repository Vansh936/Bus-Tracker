"use client"

import { LiveMap } from "@/components/live-map"
import { BusArrivals } from "@/components/bus-arrivals"
import GmailAuth from "@/components/gmail-auth"
import { Navigation, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LiveTrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Navigation className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Live Tracking</h1>
            </div>
          </div>
          <GmailAuth />
        </div>
      </header>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Real-Time Bus Locations</h2>
              <p className="text-muted-foreground">
                Track buses in real-time and see their current positions on the map.
              </p>
            </div>
            <LiveMap />
          </div>

          {/* Bus Arrivals Sidebar */}
          <div className="space-y-6">
            <BusArrivals />
          </div>
        </div>
      </div>
    </div>
  )
}
