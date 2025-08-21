"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
          toast.error("Please log in to view orders");
          router.push("/login");
          return;
        }

        const res = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", res.status);
        const text = await res.text();
        console.log("Raw response:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          toast.error("❌ Server returned invalid response.");
          return;
        }

        if (res.ok) {
          setOrders(data.orders);
        } else {
          toast.error(data.message || "Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("❌ Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900"
      >
        My Orders
      </motion.h1>

      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Order placed on {new Date(order.createdAt).toLocaleDateString()}
              </h2>
              <p className="text-sm text-gray-600">
                Total: £{order.total.toFixed(2)}
              </p>
              <div className="mt-4">
                <h3 className="text-md font-medium text-gray-800">Items:</h3>
                {order.cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}-${index}`}
                    className="flex justify-between text-sm text-gray-700 mt-2"
                  >
                    <span>
                      {item.title} x {item.quantity}
                    </span>
                    <span>£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Shipping to:</strong> {order.formData.fullName}
                </p>
                <p>{order.formData.address}</p>
                <p>
                  {order.formData.city}, {order.formData.postalCode},{" "}
                  {order.formData.country}
                </p>
                <p>
                  <strong>Email:</strong> {order.formData.email}
                </p>
                 <p>
    <strong>Contact:</strong> {order.formData.contactNumber}
  </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
