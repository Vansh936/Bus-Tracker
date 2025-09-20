import { SystemOverview } from "@/components/system-overview"
import { LiveDataSummary } from "@/components/live-data-summary"
import { SystemAlerts } from "@/components/system-alerts";
import { QuickActions } from "@/components/quick-actions"
import GmailAuth from "@/components/gmail-auth"
import { Navigation, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AuthGuard from "@/components/AuthGuard";


export default function DashboardPage() {
  return (
    <AuthGuard>
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
                <h1 className="text-xl font-bold text-foreground">Live Dashboard</h1>
              </div>
            </div>
            <GmailAuth />
          </div>
        </header>

        <div className="container px-4 py-8">
          <div className="space-y-8">
            {/* Page Header */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Transit System Dashboard</h2>
              <p className="text-muted-foreground">Real-time overview of bus operations, routes, and system status.</p>
            </div>

            {/* System Overview */}
            <SystemOverview /> 

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Live Data */}
              <div className="lg:col-span-2 space-y-8">
                <LiveDataSummary />
              </div>

              {/* Right Column - Alerts & Actions */}
              <div className="space-y-8">
                <SystemAlerts />
                <QuickActions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
