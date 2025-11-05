// components/live-data-summary.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function LiveDataSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Live PMPML System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Buses Operating</span>
            <span className="text-2xl font-bold">385/420</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '91.6%' }}></div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium">Routes Active</span>
            <span className="text-2xl font-bold">65/70</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '92.8%' }}></div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium">Average Delay</span>
            <span className="text-2xl font-bold">4 mins</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Within acceptable range
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <span className="text-sm font-medium">Peak Coverage Areas</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pimpri-Chinchwad</span>
              <span className="font-medium">45 buses</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hinjewadi IT Park</span>
              <span className="font-medium">38 buses</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hadapsar-Kharadi</span>
              <span className="font-medium">42 buses</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Swargate-Katraj</span>
              <span className="font-medium">35 buses</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}