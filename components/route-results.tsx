// components/route-results.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock, MapPin, TrendingUp } from "lucide-react";

// Comprehensive Pune Bus Routes (100+ routes covering all major areas)
const PUNE_BUS_ROUTES = [
  // Swargate Routes (15 routes)
  { id: 1, busNumber: "1", from: "Swargate", to: "Katraj", via: ["Market Yard", "Dhankawadi", "Bibvewadi"], duration: "25 mins", frequency: "8 mins", fare: "₹15" },
  { id: 2, busNumber: "2", from: "Swargate", to: "Hadapsar", via: ["Salisbury Park", "Wanowrie", "NIBM"], duration: "35 mins", frequency: "12 mins", fare: "₹20" },
  { id: 3, busNumber: "3", from: "Swargate", to: "Kothrud", via: ["Parvati", "Deccan Gymkhana", "Karve Road"], duration: "30 mins", frequency: "10 mins", fare: "₹18" },
  { id: 4, busNumber: "4", from: "Swargate", to: "Shivajinagar", via: ["Sarasbaug", "Prabhat Road", "Deccan"], duration: "25 mins", frequency: "8 mins", fare: "₹15" },
  { id: 5, busNumber: "5", from: "Swargate", to: "Pimpri", via: ["Shivajinagar", "Khadki", "Dapodi"], duration: "55 mins", frequency: "20 mins", fare: "₹32" },
  { id: 6, busNumber: "6", from: "Swargate", to: "Wakad", via: ["Kothrud", "Baner", "Aundh"], duration: "65 mins", frequency: "25 mins", fare: "₹38" },
  { id: 7, busNumber: "7", from: "Swargate", to: "Camp", via: ["Sarasbaug", "MG Road"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 8, busNumber: "8", from: "Swargate", to: "Kondhwa", via: ["Market Yard", "Bibvewadi"], duration: "35 mins", frequency: "15 mins", fare: "₹20" },
  { id: 9, busNumber: "9", from: "Swargate", to: "Warje", via: ["Market Yard", "Karve Road"], duration: "40 mins", frequency: "18 mins", fare: "₹22" },
  { id: 10, busNumber: "10", from: "Swargate", to: "Deccan", via: ["Prabhat Road"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 11, busNumber: "11", from: "Swargate", to: "Baner", via: ["Kothrud", "Aundh"], duration: "55 mins", frequency: "22 mins", fare: "₹32" },
  { id: 12, busNumber: "12", from: "Swargate", to: "Viman Nagar", via: ["Shivajinagar", "Yerawada"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 13, busNumber: "13", from: "Swargate", to: "Kharadi", via: ["Hadapsar", "Mundhwa"], duration: "50 mins", frequency: "20 mins", fare: "₹30" },
  { id: 14, busNumber: "14", from: "Swargate", to: "Undri", via: ["Bibvewadi", "Kondhwa"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 15, busNumber: "15", from: "Swargate", to: "Aundh", via: ["Deccan", "University"], duration: "50 mins", frequency: "20 mins", fare: "₹30" },
  
  // Pune Station Routes (15 routes)
  { id: 16, busNumber: "16", from: "Pune Station", to: "Hadapsar", via: ["Yerawada", "Koregaon Park", "Mundhwa"], duration: "40 mins", frequency: "15 mins", fare: "₹25" },
  { id: 17, busNumber: "17", from: "Pune Station", to: "Shivajinagar", via: ["Bund Garden", "Ruby Hall Clinic"], duration: "15 mins", frequency: "5 mins", fare: "₹10" },
  { id: 18, busNumber: "18", from: "Pune Station", to: "Kothrud", via: ["Shivajinagar", "Deccan", "Karve Road"], duration: "35 mins", frequency: "12 mins", fare: "₹20" },
  { id: 19, busNumber: "19", from: "Pune Station", to: "Pimpri", via: ["Khadki", "Dapodi", "Kasarwadi"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 20, busNumber: "20", from: "Pune Station", to: "Swargate", via: ["Bund Garden", "Sarasbaug"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 21, busNumber: "21", from: "Pune Station", to: "Katraj", via: ["Swargate", "Market Yard"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 22, busNumber: "22", from: "Pune Station", to: "Viman Nagar", via: ["Yerawada", "Kalyani Nagar"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 23, busNumber: "23", from: "Pune Station", to: "Kharadi", via: ["Yerawada", "Viman Nagar"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 24, busNumber: "24", from: "Pune Station", to: "Wakad", via: ["Shivajinagar", "Aundh", "Baner"], duration: "65 mins", frequency: "25 mins", fare: "₹38" },
  { id: 25, busNumber: "25", from: "Pune Station", to: "Hinjewadi", via: ["Shivajinagar", "Aundh", "Wakad"], duration: "75 mins", frequency: "30 mins", fare: "₹45" },
  { id: 26, busNumber: "26", from: "Pune Station", to: "Camp", via: ["Bund Garden"], duration: "15 mins", frequency: "6 mins", fare: "₹10" },
  { id: 27, busNumber: "27", from: "Pune Station", to: "Deccan", via: ["Shivajinagar"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 28, busNumber: "28", from: "Pune Station", to: "Aundh", via: ["Shivajinagar", "University"], duration: "40 mins", frequency: "15 mins", fare: "₹25" },
  { id: 29, busNumber: "29", from: "Pune Station", to: "Baner", via: ["Shivajinagar", "Aundh"], duration: "50 mins", frequency: "20 mins", fare: "₹30" },
  { id: 30, busNumber: "30", from: "Pune Station", to: "Koregaon Park", via: ["Yerawada"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  
  // Shivajinagar Routes (15 routes)
  { id: 31, busNumber: "31", from: "Shivajinagar", to: "Hinjewadi", via: ["Aundh", "Baner", "Balewadi", "Wakad"], duration: "65 mins", frequency: "20 mins", fare: "₹40" },
  { id: 32, busNumber: "32", from: "Shivajinagar", to: "Kharadi", via: ["Yerawada", "Viman Nagar"], duration: "45 mins", frequency: "15 mins", fare: "₹28" },
  { id: 33, busNumber: "33", from: "Shivajinagar", to: "Katraj", via: ["Deccan", "Swargate", "Market Yard"], duration: "40 mins", frequency: "15 mins", fare: "₹25" },
  { id: 34, busNumber: "34", from: "Shivajinagar", to: "Aundh", via: ["University"], duration: "30 mins", frequency: "10 mins", fare: "₹18" },
  { id: 35, busNumber: "35", from: "Shivajinagar", to: "Kothrud", via: ["Deccan", "Karve Road"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 36, busNumber: "36", from: "Shivajinagar", to: "Hadapsar", via: ["Yerawada", "Mundhwa"], duration: "50 mins", frequency: "20 mins", fare: "₹30" },
  { id: 37, busNumber: "37", from: "Shivajinagar", to: "Pimpri", via: ["Khadki", "Dapodi"], duration: "40 mins", frequency: "15 mins", fare: "₹25" },
  { id: 38, busNumber: "38", from: "Shivajinagar", to: "Wakad", via: ["Aundh", "Baner"], duration: "50 mins", frequency: "18 mins", fare: "₹30" },
  { id: 39, busNumber: "39", from: "Shivajinagar", to: "Baner", via: ["Aundh"], duration: "35 mins", frequency: "12 mins", fare: "₹20" },
  { id: 40, busNumber: "40", from: "Shivajinagar", to: "Swargate", via: ["Deccan"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 41, busNumber: "41", from: "Shivajinagar", to: "Camp", via: ["MG Road"], duration: "15 mins", frequency: "6 mins", fare: "₹10" },
  { id: 42, busNumber: "42", from: "Shivajinagar", to: "Viman Nagar", via: ["Yerawada"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 43, busNumber: "43", from: "Shivajinagar", to: "Deccan", via: ["Prabhat Road"], duration: "15 mins", frequency: "5 mins", fare: "₹10" },
  { id: 44, busNumber: "44", from: "Shivajinagar", to: "Warje", via: ["Kothrud", "Karve Road"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 45, busNumber: "45", from: "Shivajinagar", to: "Kondhwa", via: ["Swargate", "Bibvewadi"], duration: "50 mins", frequency: "20 mins", fare: "₹30" },
  
  // Hadapsar Routes (12 routes)
  { id: 46, busNumber: "46", from: "Hadapsar", to: "Katraj", via: ["NIBM", "Kondhwa", "Undri"], duration: "35 mins", frequency: "15 mins", fare: "₹20" },
  { id: 47, busNumber: "47", from: "Hadapsar", to: "Pimpri", via: ["Yerawada", "Khadki", "Dapodi"], duration: "50 mins", frequency: "20 mins", fare: "₹30" },
  { id: 48, busNumber: "48", from: "Hadapsar", to: "Kothrud", via: ["Wanowrie", "Deccan Gymkhana"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 49, busNumber: "49", from: "Hadapsar", to: "Wakad", via: ["Kharadi", "Viman Nagar", "Aundh"], duration: "60 mins", frequency: "22 mins", fare: "₹35" },
  { id: 50, busNumber: "50", from: "Hadapsar", to: "Swargate", via: ["Wanowrie", "Salisbury Park"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 51, busNumber: "51", from: "Hadapsar", to: "Shivajinagar", via: ["Yerawada", "Koregaon Park"], duration: "40 mins", frequency: "15 mins", fare: "₹25" },
  { id: 52, busNumber: "52", from: "Hadapsar", to: "Kharadi", via: ["Mundhwa"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 53, busNumber: "53", from: "Hadapsar", to: "Viman Nagar", via: ["Mundhwa", "Kharadi"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 54, busNumber: "54", from: "Hadapsar", to: "Pune Station", via: ["Yerawada", "Bund Garden"], duration: "35 mins", frequency: "15 mins", fare: "₹20" },
  { id: 55, busNumber: "55", from: "Hadapsar", to: "Kondhwa", via: ["NIBM"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 56, busNumber: "56", from: "Hadapsar", to: "Undri", via: ["Kondhwa"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 57, busNumber: "57", from: "Hadapsar", to: "Hinjewadi", via: ["Kharadi", "Aundh", "Wakad"], duration: "75 mins", frequency: "30 mins", fare: "₹45" },
  
  // Kothrud Routes (12 routes)
  { id: 58, busNumber: "58", from: "Kothrud", to: "Pimpri", via: ["Deccan", "Shivajinagar", "Kasarwadi"], duration: "55 mins", frequency: "18 mins", fare: "₹32" },
  { id: 59, busNumber: "59", from: "Kothrud", to: "Wakad", via: ["Baner", "Balewadi"], duration: "40 mins", frequency: "15 mins", fare: "₹25" },
  { id: 60, busNumber: "60", from: "Kothrud", to: "Katraj", via: ["Bharati Vidyapeeth", "Dhankawadi"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 61, busNumber: "61", from: "Kothrud", to: "Camp", via: ["Deccan", "Shivajinagar", "MG Road"], duration: "40 mins", frequency: "15 mins", fare: "₹25" },
  { id: 62, busNumber: "62", from: "Kothrud", to: "Swargate", via: ["Deccan", "Prabhat Road"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 63, busNumber: "63", from: "Kothrud", to: "Shivajinagar", via: ["Deccan"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 64, busNumber: "64", from: "Kothrud", to: "Aundh", via: ["University"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 65, busNumber: "65", from: "Kothrud", to: "Baner", via: ["Aundh"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 66, busNumber: "66", from: "Kothrud", to: "Hadapsar", via: ["Deccan", "Shivajinagar", "Yerawada"], duration: "50 mins", frequency: "20 mins", fare: "₹30" },
  { id: 67, busNumber: "67", from: "Kothrud", to: "Hinjewadi", via: ["Baner", "Wakad"], duration: "55 mins", frequency: "22 mins", fare: "₹35" },
  { id: 68, busNumber: "68", from: "Kothrud", to: "Warje", via: ["Karve Road"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 69, busNumber: "69", from: "Kothrud", to: "Deccan", via: ["Karve Road"], duration: "15 mins", frequency: "6 mins", fare: "₹10" },
  
  // Pimpri-Chinchwad Routes (10 routes)
  { id: 70, busNumber: "70", from: "Pimpri", to: "Chinchwad", via: ["Akurdi"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 71, busNumber: "71", from: "Pimpri", to: "Nigdi", via: ["Chinchwad", "Akurdi"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 72, busNumber: "72", from: "Pimpri", to: "Hinjewadi", via: ["Wakad", "Tathawade"], duration: "50 mins", frequency: "20 mins", fare: "₹30" },
  { id: 73, busNumber: "73", from: "Pimpri", to: "Kothrud", via: ["Shivajinagar", "Deccan"], duration: "55 mins", frequency: "20 mins", fare: "₹32" },
  { id: 74, busNumber: "74", from: "Pimpri", to: "Pune Station", via: ["Dapodi", "Khadki"], duration: "40 mins", frequency: "15 mins", fare: "₹25" },
  { id: 75, busNumber: "75", from: "Pimpri", to: "Swargate", via: ["Shivajinagar", "Deccan"], duration: "60 mins", frequency: "25 mins", fare: "₹35" },
  { id: 76, busNumber: "76", from: "Pimpri", to: "Wakad", via: ["Kasarwadi", "Ravet"], duration: "35 mins", frequency: "15 mins", fare: "₹20" },
  { id: 77, busNumber: "77", from: "Pimpri", to: "Shivajinagar", via: ["Dapodi", "Khadki"], duration: "35 mins", frequency: "15 mins", fare: "₹20" },
  { id: 78, busNumber: "78", from: "Pimpri", to: "Hadapsar", via: ["Pune Station", "Yerawada"], duration: "55 mins", frequency: "22 mins", fare: "₹32" },
  { id: 79, busNumber: "79", from: "Chinchwad", to: "Nigdi", via: ["Akurdi"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  
  // Wakad-Hinjewadi Routes (8 routes)
  { id: 80, busNumber: "80", from: "Wakad", to: "Hinjewadi", via: ["Tathawade", "Pimple Nilakh"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 81, busNumber: "81", from: "Wakad", to: "Shivajinagar", via: ["Aundh", "University"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 82, busNumber: "82", from: "Wakad", to: "Camp", via: ["Baner", "Aundh", "Deccan", "MG Road"], duration: "60 mins", frequency: "22 mins", fare: "₹35" },
  { id: 83, busNumber: "83", from: "Wakad", to: "Baner", via: ["Balewadi"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 84, busNumber: "84", from: "Wakad", to: "Aundh", via: ["Baner"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 85, busNumber: "85", from: "Wakad", to: "Pimpri", via: ["Ravet", "Kasarwadi"], duration: "35 mins", frequency: "15 mins", fare: "₹20" },
  { id: 86, busNumber: "86", from: "Hinjewadi", to: "Pune Station", via: ["Wakad", "Aundh", "Shivajinagar"], duration: "70 mins", frequency: "25 mins", fare: "₹40" },
  { id: 87, busNumber: "87", from: "Hinjewadi", to: "Swargate", via: ["Wakad", "Kothrud"], duration: "75 mins", frequency: "30 mins", fare: "₹45" },
  
  // Aundh-Baner Routes (8 routes)
  { id: 88, busNumber: "88", from: "Aundh", to: "Baner", via: ["Pashan"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 89, busNumber: "89", from: "Aundh", to: "Kothrud", via: ["University", "Karve Road"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 90, busNumber: "90", from: "Baner", to: "Hinjewadi", via: ["Balewadi", "Wakad"], duration: "35 mins", frequency: "15 mins", fare: "₹22" },
  { id: 91, busNumber: "91", from: "Baner", to: "Shivajinagar", via: ["Aundh", "University"], duration: "35 mins", frequency: "15 mins", fare: "₹22" },
  { id: 92, busNumber: "92", from: "Aundh", to: "Pune Station", via: ["Shivajinagar"], duration: "35 mins", frequency: "15 mins", fare: "₹20" },
  { id: 93, busNumber: "93", from: "Baner", to: "Swargate", via: ["Kothrud", "Deccan"], duration: "50 mins", frequency: "20 mins", fare: "₹30" },
  { id: 94, busNumber: "94", from: "Aundh", to: "Deccan", via: ["University"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 95, busNumber: "95", from: "Baner", to: "Wakad", via: ["Balewadi"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  
  // Kharadi-Viman Nagar Routes (8 routes)
  { id: 96, busNumber: "96", from: "Kharadi", to: "Viman Nagar", via: ["Phoenix Mall"], duration: "15 mins", frequency: "6 mins", fare: "₹10" },
  { id: 97, busNumber: "97", from: "Kharadi", to: "Hadapsar", via: ["Mundhwa"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 98, busNumber: "98", from: "Viman Nagar", to: "Pune Station", via: ["Yerawada", "Bund Garden"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 99, busNumber: "99", from: "Viman Nagar", to: "Koregaon Park", via: ["Kalyani Nagar"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 100, busNumber: "100", from: "Kharadi", to: "Shivajinagar", via: ["Viman Nagar", "Yerawada"], duration: "40 mins", frequency: "15 mins", fare: "₹25" },
  { id: 101, busNumber: "101", from: "Viman Nagar", to: "Swargate", via: ["Pune Station", "Bund Garden"], duration: "45 mins", frequency: "18 mins", fare: "₹28" },
  { id: 102, busNumber: "102", from: "Kharadi", to: "Wakad", via: ["Viman Nagar", "Aundh"], duration: "60 mins", frequency: "25 mins", fare: "₹35" },
  { id: 103, busNumber: "103", from: "Viman Nagar", to: "Hadapsar", via: ["Kharadi", "Mundhwa"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  
  // Additional Important Routes (17 routes)
  { id: 104, busNumber: "104", from: "Katraj", to: "Dhankawadi", via: ["Bibvewadi"], duration: "15 mins", frequency: "6 mins", fare: "₹10" },
  { id: 105, busNumber: "105", from: "Katraj", to: "Kondhwa", via: ["Undri"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 106, busNumber: "106", from: "Kondhwa", to: "Hadapsar", via: ["NIBM", "Wanowrie"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 107, busNumber: "107", from: "Camp", to: "Deccan", via: ["MG Road", "Shivajinagar"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 108, busNumber: "108", from: "Camp", to: "Swargate", via: ["Sarasbaug"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 109, busNumber: "109", from: "Deccan", to: "Aundh", via: ["University"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 110, busNumber: "110", from: "Warje", to: "Bavdhan", via: ["Sus"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 111, busNumber: "111", from: "Warje", to: "Kothrud", via: ["Karve Road"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 112, busNumber: "112", from: "Bavdhan", to: "Hinjewadi", via: ["Baner", "Balewadi"], duration: "35 mins", frequency: "15 mins", fare: "₹22" },
  { id: 113, busNumber: "113", from: "Khadki", to: "Dapodi", via: ["Kasarwadi"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 114, busNumber: "114", from: "Khadki", to: "Pune Station", via: ["Bund Garden"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 115, busNumber: "115", from: "Yerawada", to: "Viman Nagar", via: ["Kalyani Nagar"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 116, busNumber: "116", from: "Yerawada", to: "Kharadi", via: ["Viman Nagar"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 117, busNumber: "117", from: "Pimple Saudagar", to: "Wakad", via: ["Ravet"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
  { id: 118, busNumber: "118", from: "Pimple Nilakh", to: "Hinjewadi", via: ["Tathawade"], duration: "20 mins", frequency: "8 mins", fare: "₹12" },
  { id: 119, busNumber: "119", from: "Bhosari", to: "Pimpri", via: ["Chinchwad"], duration: "30 mins", frequency: "12 mins", fare: "₹18" },
  { id: 120, busNumber: "120", from: "Kalewadi", to: "Wakad", via: ["Ravet"], duration: "25 mins", frequency: "10 mins", fare: "₹15" },
];

export function RouteResults() {
  const [routes, setRoutes] = useState<typeof PUNE_BUS_ROUTES>([]);
  const [searchParams, setSearchParams] = useState<{ from: string; to: string } | null>(null);

  useEffect(() => {
    const handleRouteSearch = () => {
      const stored = sessionStorage.getItem('routeSearch');
      if (stored) {
        const params = JSON.parse(stored);
        setSearchParams(params);
        
        // FIXED: More flexible filtering logic
        const filtered = PUNE_BUS_ROUTES.filter(route => {
          const fromLower = params.from.toLowerCase().trim();
          const toLower = params.to.toLowerCase().trim();
          
          // Get all stops in the route (from, via, to)
          const allStops = [
            route.from.toLowerCase(),
            ...route.via.map(stop => stop.toLowerCase()),
            route.to.toLowerCase()
          ];
          
          // Check if 'from' location matches any stop
          const fromMatch = allStops.some(stop => 
            stop.includes(fromLower) || fromLower.includes(stop)
          );
          
          // Check if 'to' location matches any stop
          const toMatch = allStops.some(stop => 
            stop.includes(toLower) || toLower.includes(stop)
          );
          
          // Both must match
          if (!fromMatch || !toMatch) {
            return false;
          }
          
          // Find positions of from and to in the route
          const fromIndex = allStops.findIndex(stop => 
            stop.includes(fromLower) || fromLower.includes(stop)
          );
          const toIndex = allStops.findIndex(stop => 
            stop.includes(toLower) || toLower.includes(stop)
          );
          
          // Route is valid only if 'from' comes before 'to' in the sequence
          return fromIndex < toIndex;
        });
        
        setRoutes(filtered);
      }
    };

    window.addEventListener('routeSearchUpdated', handleRouteSearch);
    handleRouteSearch();

    return () => {
      window.removeEventListener('routeSearchUpdated', handleRouteSearch);
    };
  }, []);

  if (routes.length === 0 && !searchParams) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-primary" />
            Available Routes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-lg font-medium mb-2">👆 Enter your journey details</p>
            <p className="text-sm">Select starting point and destination to see available routes</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (routes.length === 0 && searchParams) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-primary" />
            Available Routes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-lg font-medium text-destructive mb-2">❌ No routes found</p>
            <p className="text-sm text-muted-foreground mb-4">
              From: <span className="font-semibold">{searchParams.from}</span> → To: <span className="font-semibold">{searchParams.to}</span>
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>💡 Tips:</p>
              <p>• Try using shorter location names (e.g., "Swargate" instead of "Swargate Bus Stand")</p>
              <p>• Check spelling of location names</p>
              <p>• Try nearby locations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-5 w-5 text-primary" />
          Available Routes
          <Badge variant="secondary" className="ml-2">
            {routes.length} route(s) found
          </Badge>
        </CardTitle>
        {searchParams && (
          <p className="text-sm text-muted-foreground mt-2">
            From <span className="font-semibold text-foreground">{searchParams.from}</span> to <span className="font-semibold text-foreground">{searchParams.to}</span>
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
        {routes.map((route) => (
          <div
            key={route.id}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  {route.busNumber}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">Bus {route.busNumber}</div>
                  <div className="text-sm text-muted-foreground">
                    {route.from} → {route.to}
                  </div>
                </div>
              </div>
              <Badge className="bg-accent text-accent-foreground text-base px-3 py-1">{route.fare}</Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground bg-muted/50 p-3 rounded-md">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <div className="flex-1">
                  <span className="font-medium text-foreground">All Stops: </span>
                  <div className="mt-1 text-foreground">
                    <span className="font-semibold text-primary">{route.from}</span>
                    {route.via.map((stop, idx) => (
                      <span key={idx}>
                        <span className="mx-2">→</span>
                        <span>{stop}</span>
                      </span>
                    ))}
                    <span className="mx-2">→</span>
                    <span className="font-semibold text-accent">{route.to}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 px-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">{route.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">Every {route.frequency}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
