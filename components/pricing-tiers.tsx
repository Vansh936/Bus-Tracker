import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, MapPin, CreditCard } from "lucide-react"

export function PricingTiers() {
  return (
    <div className="space-y-6">
      {/* Passenger Types */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Passenger Types
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Adult (18-64)</div>
                <div className="text-sm text-muted-foreground">Standard pricing</div>
              </div>
              <Badge variant="secondary">Full Price</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Student</div>
                <div className="text-sm text-muted-foreground">Valid student ID required</div>
              </div>
              <Badge className="bg-accent/10 text-accent">25% Off</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Senior (65+)</div>
                <div className="text-sm text-muted-foreground">Age verification required</div>
              </div>
              <Badge className="bg-accent/10 text-accent">30% Off</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Child (5-17)</div>
                <div className="text-sm text-muted-foreground">Under 5 ride free</div>
              </div>
              <Badge className="bg-accent/10 text-accent">50% Off</Badge>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Zone Pricing */}
      {/* <Card> */}
        {/* <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Zone Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground mb-3">Base fare: $2.50 + $0.75 per zone traveled</div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span>Same zone:</span>
                <span className="font-medium">$2.50</span>
              </div>
              <div className="flex justify-between">
                <span>1 zone:</span>
                <span className="font-medium">$3.25</span>
              </div>
              <div className="flex justify-between">
                <span>2 zones:</span>
                <span className="font-medium">$4.00</span>
              </div>
              <div className="flex justify-between">
                <span>3 zones:</span>
                <span className="font-medium">$4.75</span>
              </div>
              <div className="flex justify-between">
                <span>4 zones:</span>
                <span className="font-medium">$5.50</span>
              </div>
              <div className="flex justify-between">
                <span>Transfer:</span>
                <span className="font-medium">+$0.50</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Pass Options */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Pass Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Day Pass</div>
                <div className="text-lg font-bold text-accent">$8.50</div>
              </div>
              <div className="text-sm text-muted-foreground">Unlimited rides for 24 hours • No transfer fees</div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Weekly Pass</div>
                <div className="text-lg font-bold text-accent">$35.00</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Unlimited rides for 7 days • Best for regular commuters
              </div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Monthly Pass</div>
                <div className="text-lg font-bold text-accent">$120.00</div>
              </div>
              <div className="text-sm text-muted-foreground">Unlimited rides for 30 days • Maximum savings</div>
            </div>
          </div>
        </CardContent> */}
      {/* </Card> */}

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>• Transfers must be completed within 2 hours</div>
          <div>• Student and senior discounts require valid ID</div>
          <div>• Children under 5 ride free with paying adult</div>
          <div>• Passes are non-refundable and non-transferable</div>
          <div>• Mobile tickets available through the app</div>
        </CardContent>
      </Card>
      
    </div>
  )
}
