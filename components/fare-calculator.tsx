"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Users, CreditCard } from "lucide-react"

interface FareBreakdown {
  baseFare: number
  distanceFee: number
  transferFee: number
  discount: number
  total: number
}

function getPassengerTypeLabel(type: string): string {
  switch (type) {
    case "adult":
      return "Adult (18-64)"
    case "student":
      return "Student (25% discount)"
    case "senior":
      return "Senior 65+ (30% discount)"
    case "child":
      return "Child 5-17 (50% discount)"
    default:
      return "Unknown"
  }
}

export function FareCalculator() {
  const [fromZone, setFromZone] = useState("")
  const [toZone, setToZone] = useState("")
  const [passengerType, setPassengerType] = useState("adult")
  const [transfers, setTransfers] = useState("0")
  const [passType, setPassType] = useState("single")
  const [fareBreakdown, setFareBreakdown] = useState<FareBreakdown | null>(null)

  const calculateFare = () => {
    if (!fromZone || !toZone) return

    const zoneDistance = Math.abs(Number.parseInt(fromZone) - Number.parseInt(toZone))
    const baseFare = 2.5
    const distanceFee = zoneDistance * 0.75
    let transferFee = Number.parseInt(transfers) * 0.5
    let discount = 0

    // Apply passenger type discounts
    switch (passengerType) {
      case "student":
        discount = (baseFare + distanceFee) * 0.25
        break
      case "senior":
        discount = (baseFare + distanceFee) * 0.3
        break
      case "child":
        discount = (baseFare + distanceFee) * 0.5
        break
    }

    // Apply pass type adjustments
    let multiplier = 1
    switch (passType) {
      case "day":
        multiplier = 3.5
        transferFee = 0 // No transfer fees with day pass
        break
      case "week":
        multiplier = 20
        transferFee = 0
        break
      case "month":
        multiplier = 75
        transferFee = 0
        break
    }

    const subtotal = baseFare + distanceFee + transferFee - discount
    const total = passType === "single" ? subtotal : multiplier

    setFareBreakdown({
      baseFare,
      distanceFee,
      transferFee,
      discount,
      total,
    })
  }

 

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Journey Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Zone Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-zone">From Zone</Label>
              <Select value={fromZone} onValueChange={setFromZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Zone 1 - Downtown</SelectItem>
                  <SelectItem value="2">Zone 2 - City Center</SelectItem>
                  <SelectItem value="3">Zone 3 - Midtown</SelectItem>
                  <SelectItem value="4">Zone 4 - Uptown</SelectItem>
                  <SelectItem value="5">Zone 5 - Suburbs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-zone">To Zone</Label>
              <Select value={toZone} onValueChange={setToZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Zone 1 - Downtown</SelectItem>
                  <SelectItem value="2">Zone 2 - City Center</SelectItem>
                  <SelectItem value="3">Zone 3 - Midtown</SelectItem>
                  <SelectItem value="4">Zone 4 - Uptown</SelectItem>
                  <SelectItem value="5">Zone 5 - Suburbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Passenger Type */}
          <div className="space-y-2">
            <Label>Passenger Type</Label>
            <Select value={passengerType} onValueChange={setPassengerType}>
              <SelectTrigger>
                <Users className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="adult">Adult (18-64)</SelectItem>
                <SelectItem value="student">Student (25% discount)</SelectItem>
                <SelectItem value="senior">Senior 65+ (30% discount)</SelectItem>
                <SelectItem value="child">Child 5-17 (50% discount)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pass Type */}
          <div className="space-y-2">
            <Label>Pass Type</Label>
            <Select value={passType} onValueChange={setPassType}>
              <SelectTrigger>
                <CreditCard className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Journey</SelectItem>
                <SelectItem value="day">Day Pass</SelectItem>
                <SelectItem value="week">Weekly Pass</SelectItem>
                <SelectItem value="month">Monthly Pass</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transfers */}
          {passType === "single" && (
            <div className="space-y-2">
              <Label>Number of Transfers</Label>
              <Select value={transfers} onValueChange={setTransfers}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No transfers</SelectItem>
                  <SelectItem value="1">1 transfer</SelectItem>
                  <SelectItem value="2">2 transfers</SelectItem>
                  <SelectItem value="3">3+ transfers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Calculate Button */}
          <Button
            onClick={calculateFare}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!fromZone || !toZone}
          >
            Calculate Fare
          </Button>
        </CardContent>
      </Card>

      {/* Fare Breakdown */}
      {fareBreakdown && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent" />
              Fare Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Passenger Type:</span>
                <Badge variant="secondary">{getPassengerTypeLabel(passengerType)}</Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Journey:</span>
                <span>
                  Zone {fromZone} → Zone {toZone}
                </span>
              </div>

              {passType === "single" && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base fare:</span>
                      <span>${fareBreakdown.baseFare.toFixed(2)}</span>
                    </div>

                    {fareBreakdown.distanceFee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Distance fee:</span>
                        <span>${fareBreakdown.distanceFee.toFixed(2)}</span>
                      </div>
                    )}

                    {fareBreakdown.transferFee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Transfer fee:</span>
                        <span>${fareBreakdown.transferFee.toFixed(2)}</span>
                      </div>
                    )}

                    {fareBreakdown.discount > 0 && (
                      <div className="flex justify-between text-sm text-accent">
                        <span>Discount:</span>
                        <span>-${fareBreakdown.discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </>
              )}

              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-accent">${fareBreakdown.total.toFixed(2)}</span>
              </div>

              {passType !== "single" && (
                <div className="text-xs text-muted-foreground text-center">
                  Unlimited rides for {passType === "day" ? "24 hours" : passType === "week" ? "7 days" : "30 days"}
                </div>
              )}
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Purchase Ticket</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
