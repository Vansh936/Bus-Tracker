// app/login/page.tsx
"use client";

import React, { useState, FormEvent, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u: User | null) => {
      setUser(u);
      if (u) router.replace("/");
    });
    return () => unsub();
  }, [router]);

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: `${firstName} ${lastName}` });
        router.replace("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold">{user.email ?? user.displayName}</h2>
          <p className="mt-2 text-gray-600">You are signed in 🎉</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Bus.jpg')" }}
    >
      <div className="w-full max-w-md bg-white/90 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogle}
            className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 font-semibold ml-1"
          >
            {isSignup ? "Login" : "Create new"}
          </button>
        </p>
      </div>
    </div>
  );
}
