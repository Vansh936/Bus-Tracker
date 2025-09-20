"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, User, LogOut } from "lucide-react"

import { auth } from "@/lib/firebase"
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"

// ✅ Default export
export default function GmailAuth() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setUserEmail(user.email || "")
        setUserName(user.displayName || user.email || "User")
      } else {
        setIsAuthenticated(false)
        setUserEmail("")
        setUserName("")
      }
    })
    return () => unsubscribe()
  }, [])

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      setIsAuthenticated(true)
      setUserEmail(user.email || "")
      setUserName(user.displayName || user.email || "User")
      setIsOpen(false)
    } catch (error) {
      console.error("Google login failed:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsAuthenticated(false)
      setUserEmail("")
      setUserName("")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{userName || userEmail}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Mail className="h-4 w-4" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Login with Gmail
          </DialogTitle>
          <DialogDescription>
            Sign in with your Google account to access all features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            Continue with Google
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
