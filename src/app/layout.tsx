import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Medi-Solution — Your Trusted Digital Medicine Guide",
    template: "%s | Medi-Solution",
  },
  description:
    "Search medicines, view dosage information, side effects, prices, and health guidelines from Bangladesh's leading pharmaceutical companies.",
  keywords: [
    "medicine",
    "Bangladesh",
    "pharmacy",
    "dosage",
    "side effects",
    "pharmaceutical",
    "health",
    "Medi-Solution",
  ],
  openGraph: {
    title: "Medi-Solution — Your Trusted Digital Medicine Guide",
    description:
      "Search medicines, dosage, side effects, prices from Bangladesh's leading pharmaceutical companies.",
    type: "website",
    locale: "en_US",
    siteName: "Medi-Solution",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
