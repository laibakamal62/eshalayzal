"use client";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppPopup() {
  const [visible, setVisible] = useState(false);

  // Show popup after 2 seconds (optional)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const whatsappNumber = "+923143437616"; // your number
  const message = "Hello! I want to contact you.";

  return (
    <a
  href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-15 right-5 z-50 flex items-center bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
>
  <FaWhatsapp className="mr-2" size={24} />
  Chat with us
</a>

  );
}
