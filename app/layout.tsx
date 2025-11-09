import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Touch Grass",
  description: "The social game for touching grass",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-emerald-50 text-gray-900 antialiased min-h-screen flex flex-col`}
      >
        {/* ===== HEADER ===== */}
        <header className="bg-green-50 shadow-sm sticky top-0 z-30">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-.5 py-2">
            {/* Logo / Brand */}
            <Link
              href="/dashboard"
              className="text-lg font-semibold text-emerald-600 hover:text-emerald-700"
            >
              🌿 Touch Grass
            </Link>

            {/* --- Mobile Menu --- */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon">
                    <Menu className="h-5 w-5 text-emerald-700" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-48 bg-white">
                  {/* ✅ Add this to remove the warning */}
                  <VisuallyHidden>
                    <SheetTitle>Site navigation menu</SheetTitle>
                  </VisuallyHidden>

                  <nav className="flex flex-col space-y-2 mt-6">
                    <Link
                      href="/dashboard"
                      className="text-gray-800 hover:text-emerald-600 px-3 py-2 rounded-md"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/upload"
                      className="text-gray-800 hover:text-emerald-600 px-3 py-2 rounded-md"
                    >
                      Upload
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* --- Desktop Nav --- */}
            <nav className="hidden sm:flex gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-emerald-700 hover:text-emerald-900">
                  Dashboard
                </Button>
              </Link>
              <Link href="/upload">
                <Button
                  variant="default"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Upload
                </Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1">{children}</main>

        {/* ===== FOOTER ===== */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Touch Grass — The social game for touching grass 🌱
          </div>
        </footer>
      </body>
    </html>
  );
}
