import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import WhatsAppPopup from "./Components/whatsapp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eshal & Ayzal Collection",
  description: "Explore a world of fashion, beauty, and exclusive deals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <Toaster position="top-center" />

            {/* Main content area that grows to push footer down */}
            <main className="flex-grow">
              {children}
            </main>

            <Footer />

            {/* WhatsApp floating popup */}
            <WhatsAppPopup />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
