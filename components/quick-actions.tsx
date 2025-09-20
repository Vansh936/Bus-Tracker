import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, Navigation, Bell } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
        <p className="text-sm text-muted-foreground">Fast access to main features</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/route-planner">
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            Plan a Route
          </Button>
        </Link>

        <Link href="/live-tracking">
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Track Live Buses
          </Button>
        </Link>

        <Link href="/fare-calculator">
          <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
            <DollarSign className="h-4 w-4 mr-2" />
            Calculate Fare
          </Button>
        </Link>

        <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Manage Alerts
        </Button>

        <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
          <Navigation className="h-4 w-4 mr-2" />
          Trip History
        </Button>
      </CardContent>
    </Card>
  )
}
