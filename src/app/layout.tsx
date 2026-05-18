import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
  title: "Uzair | NexStack.AI - Premium Full-Stack & AI Solutions",
  description: "Portfolio of Uzair, a premium Full-Stack Developer and AI Engineer specializing in modern web, mobile apps, and cybersecurity.",
};

import { AnalyticsTracker } from "@/components/AnalyticsTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${plusJakarta.variable} font-sans antialiased bg-bg-dark text-text-main`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AnalyticsTracker />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
