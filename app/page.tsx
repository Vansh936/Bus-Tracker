import GmailAuth from "@/components/gmail-auth"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, DollarSign, Navigation, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Navigation className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">BusTracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <GmailAuth /> {/* ✅ Now it works */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-12">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground text-balance">Track Your Bus in Real-Time</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get live bus locations, arrival times, and route information. Plan your journey with confidence.
          </p>

      {/* Quick Access Cards */}           
      <div className="flex justify-center gap-8 mt-12 flex-wrap">
        <Link href="/route-planner">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer w-80 h-60 flex justify-center">
            <CardHeader className="flex flex-col items-center justify-center text-center space-y-2">
              <MapPin className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-xl text-center">Route Planning</CardTitle>
              <CardDescription className="text-base text-center">
                Find the best route to your destination
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/live-tracking">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer w-80 h-60 flex justify-center">
            <CardHeader className="flex flex-col items-center justify-center text-center space-y-2">
              <Clock className="h-10 w-10 text-accent mb-2" />
              <CardTitle className="text-xl text-center">Live Tracking</CardTitle>
              <CardDescription className="text-base text-center">
                See real-time bus locations and arrivals
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>


            {/* <Link href="/fare-calculator">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Fare Calculator</CardTitle>
                  <CardDescription>Calculate journey costs instantly</CardDescription>
                </CardHeader>
              </Card>
            </Link> */}
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/route-planner">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Plan My Route
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container px-4">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Everything You Need for Smart Commuting
          </h3>
          <div className="flex justify-center items-center gap-8 mt-12 flex-wrap">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Real-Time Updates</h4>
              <p className="text-muted-foreground">
                Get accurate arrival times and live bus locations updated every few seconds.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Smart Route Planning</h4>
              <p className="text-muted-foreground">
                Find the fastest routes with multiple transport options and transfer points.
              </p>
            </div>

            {/* <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Transparent Pricing</h4>
              <p className="text-muted-foreground">
                Know exactly how much your journey will cost before you travel.
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  )
}
