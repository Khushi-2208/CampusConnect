import { ReactNode } from "react";
import { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusConnect - College Event Management",
  description:
    "Discover and register for exciting college events in one place",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-128px)]">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
