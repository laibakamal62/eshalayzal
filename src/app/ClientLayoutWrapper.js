"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import WhatsAppPopup from "./Components/whatsapp";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideFooter = pathname === "/login" || pathname === "/signup";

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
      <WhatsAppPopup />
    </>
  );
}
