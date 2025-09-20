"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";

// Mock system alerts
const systemAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Route 23 Delays",
    message:
      "Minor delays on Route 23 due to traffic congestion on Main Street.",
    timestamp: "2 min ago",
    severity: "medium",
  },
  {
    id: 2,
    type: "info",
    title: "New Bus Stop",
    message:
      "New bus stop added at University Gateway. Now serving Routes 15 and 42.",
    timestamp: "15 min ago",
    severity: "low",
  },
  {
    id: 3,
    type: "success",
    title: "Service Restored",
    message:
      "Route 67 service has been fully restored after earlier maintenance.",
    timestamp: "1 hour ago",
    severity: "low",
  },
  {
    id: 4,
    type: "warning",
    title: "Peak Hour Alert",
    message:
      "High ridership expected during evening rush hour (5-7 PM).",
    timestamp: "2 hours ago",
    severity: "medium",
  },
];

export function SystemAlerts() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  // ✅ The missing part: return JSX
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {systemAlerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0"
          >
            <div className="mt-1">{getAlertIcon(alert.type)}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{alert.title}</h3>
                {getAlertBadge(alert.severity)}
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {alert.timestamp}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


  // return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle className="flex items-center gap-2">
    //       <AlertTriangle className="h-5 w-5 text-primary" />
    //       System Alerts
    //     </CardTitle>
    //     <p className="text-sm text-muted-foreground">Recent system notifications and updates</p>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="space-y-4">
    //       {systemAlerts.map((alert) => (
    //         <div key={alert.id} className="border rounded-lg p-3 space-y-2">
    //           <div className="flex items-start justify-between">
    //             <div className="flex items-center gap-2">
    //               {getAlertIcon(alert.type)}
    //               <span className="font-medium text-sm">{alert.title}</span>
    //             </div>
    //             {getAlertBadge(alert.severity)}
    //           </div>

    //           <p className="text-sm text-muted-foreground pl-6">{alert.message}</p>

    //           <div className="flex items-center gap-1 text-xs text-muted-foreground pl-6">
    //             <Clock className="h-3 w-3" />
    //             <span>{alert.timestamp}</span>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </CardContent>
    // </Card>
  // )
//}
