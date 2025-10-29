"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search } from "lucide-react";

const PUNE_BUS_STOPS = [
  "Swargate Bus Stand", "Pune Railway Station", "Shivajinagar", "Kothrud Depot",
  "Katraj", "Hadapsar", "Wakad", "Hinjewadi", "Aundh", "Baner", "Pashan",
  "Kharadi", "Viman Nagar", "Koregaon Park", "Deccan Gymkhana", "Sadashiv Peth",
  "Pimpri", "Chinchwad", "Nigdi", "Akurdi", "Warje", "Dhankawadi", "Sahakarnagar",
  "Market Yard", "Bhosari", "Chakan", "Talegaon", "Lonavala", "Alandi", "Dehu Road",
  "Paud Road", "Khadki", "Dapodi", "Kasarwadi", "Phugewadi", "Thergaon", "Moshi",
  "Kalewadi", "Ravet", "Tathawade", "Pimple Saudagar", "Pimple Nilakh", "Bavdhan",
  "Sus", "NDA", "Kondhwa", "Undri", "Pisoli", "NIBM", "Wanowrie", "Fatima Nagar",
  "Salisbury Park", "Camp", "MG Road", "Pune University", "Senapati Bapat Road",
  "Shivaji Nagar", "Ganesh Peth", "Budhwar Peth", "Mandai", "Nana Peth", "Raviwar Peth"
];

export function RouteForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const handleFromChange = (value: string) => {
    setFrom(value);
    if (value.length > 0) {
      const filtered = PUNE_BUS_STOPS.filter(stop =>
        stop.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(filtered);
      setShowFromDropdown(true);
    } else {
      setFromSuggestions([]);
      setShowFromDropdown(false);
    }
  };

  const handleToChange = (value: string) => {
    setTo(value);
    if (value.length > 0) {
      const filtered = PUNE_BUS_STOPS.filter(stop =>
        stop.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(filtered);
      setShowToDropdown(true);
    } else {
      setToSuggestions([]);
      setShowToDropdown(false);
    }
  };

  const selectFromStop = (stop: string) => {
    setFrom(stop);
    setShowFromDropdown(false);
  };

  const selectToStop = (stop: string) => {
    setTo(stop);
    setShowToDropdown(false);
  };

  const handleFindRoutes = () => {
    if (from && to) {
      sessionStorage.setItem('routeSearch', JSON.stringify({ from, to }));
      window.dispatchEvent(new Event('routeSearchUpdated'));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Enter Journey Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-foreground">From</label>
          <div className="relative">
            <input
              type="text"
              value={from}
              onChange={(e) => handleFromChange(e.target.value)}
              onFocus={() => from && setShowFromDropdown(true)}
              placeholder="Enter starting location"
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {showFromDropdown && fromSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {fromSuggestions.map((stop, idx) => (
                  <div
                    key={idx}
                    onClick={() => selectFromStop(stop)}
                    className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{stop}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-foreground">To</label>
          <div className="relative">
            <input
              type="text"
              value={to}
              onChange={(e) => handleToChange(e.target.value)}
              onFocus={() => to && setShowToDropdown(true)}
              placeholder="Enter destination"
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {showToDropdown && toSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {toSuggestions.map((stop, idx) => (
                  <div
                    key={idx}
                    onClick={() => selectToStop(stop)}
                    className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{stop}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button 
          onClick={handleFindRoutes}
          disabled={!from || !to}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Search className="h-4 w-4 mr-2" />
          Find Routes
        </Button>
      </CardContent>
    </Card>
  );
}