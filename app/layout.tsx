// app/layout.tsx (server component)
import "./globals.css";
import AuthGuard from "@/components/AuthGuard"; // adjust path if necessary

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
