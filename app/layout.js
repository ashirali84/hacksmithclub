import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hacksmith Club",
  description: "CTF Platform where you can practise cyber security challenges",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        {/* Static Background */}
        <div className="fixed inset-0 -z-10 h-screen w-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="min-h-[80.8vh]">
          {children}
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
