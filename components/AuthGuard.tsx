// components/AuthGuard.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase"; // adjust path if not using @/

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      // if not logged in and not already on login page -> redirect
      if (!user && pathname !== "/login") {
        router.push("/login");
      }
    });
    return () => unsub();
  }, [router, pathname]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  // When authenticated (or on login page), render children
  return <>{children}</>;
}
