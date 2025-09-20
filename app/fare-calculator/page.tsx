// import { FareCalculator } from "@/components/fare-calculator"
// import { PricingTiers } from "@/components/pricing-tiers"
// import GmailAuth from "@/components/gmail-auth"
// import { Navigation, ArrowLeft } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// export default function FareCalculatorPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between px-4">
//           <div className="flex items-center gap-4">
//             <Link href="/">
//               <Button variant="ghost" size="sm" className="flex items-center gap-2">
//                 <ArrowLeft className="h-4 w-4" />
//                 Back
//               </Button>
//             </Link>
//             <div className="flex items-center gap-2">
//               <Navigation className="h-6 w-6 text-primary" />
//               <h1 className="text-xl font-bold text-foreground">Fare Calculator</h1>
//             </div>
//           </div>
//           <GmailAuth />
//         </div>
//       </header>

//       <div className="container px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Fare Calculator */}
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold text-foreground mb-2">Calculate Your Fare</h2>
//               <p className="text-muted-foreground">
//                 Get accurate pricing for your journey including transfers and discounts.
//               </p>
//             </div>
//             <FareCalculator />
//           </div>

//           {/* Pricing Information */}
//           <div className="space-y-6">
//             <PricingTiers />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
