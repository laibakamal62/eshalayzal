"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",   // ✅ Added contact number
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("🛒 Your cart is empty.");
      return;
    }

    const requiredFields = [
      "fullName",
      "email",
      "contactNumber",   // ✅ Validate contact number
      "address",
      "city",
      "postalCode",
      "country"
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill out: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to place an order");
        router.push("/login");
        return;
      }

      console.log("Sending order:", { formData, cartItems, total: subtotal });

      const res = await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formData,
          cartItems,
          total: subtotal,
        }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        toast.error("❌ Server returned invalid response.");
        return;
      }

      if (res.ok) {
        toast.success("Order successfully placed");
        clearCart();
        router.push("/thank-you");
      } else {
        toast.error("❌ " + (data?.message || "Failed to place order."));
      }
    } catch (err) {
      console.error("Order error:", err);
      toast.error("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900"
      >
        Checkout
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-5">
              Shipping Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                    required
                  />
                </div>
              </div>

              {/* ✅ Contact Number Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                  placeholder="e.g. +92 300 1234567"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7C3AED] focus:border-[#7C3AED]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="block sm:flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-6 bg-[#7C3AED] text-white text-sm sm:text-base font-medium py-3 px-6 sm:px-8 rounded-lg w-full sm:w-auto hover:bg-[#6B21A8] transition"
            >
              <div className="flex items-center justify-center gap-2">
                <FaLock size={16} />
                Place Order Securely
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Order Summary unchanged */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-md h-fit sticky top-24"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-5">
            Order Summary
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between">
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>£{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between font-bold text-base sm:text-lg text-gray-900">
              <span>Total</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
