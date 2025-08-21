"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      try {
        const items = JSON.parse(stored);
        const cleanedItems = items.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
          image:
            item.image.startsWith("http") || item.image.startsWith("/")
              ? item.image
              : `http://localhost:3000/uploads/products/${item.image}`,
          uniqueId:
            item.uniqueId ||
            `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        }));

        const uniqueItems = Array.from(
          new Map(cleanedItems.map((item) => [item.uniqueId, item])).values()
        );

        setWishlistItems(uniqueItems);

        if (JSON.stringify(uniqueItems) !== stored) {
          localStorage.setItem("wishlist", JSON.stringify(uniqueItems));
        }
      } catch (err) {
        console.error("Error parsing wishlist from localStorage", err);
      }
    }
  }, []);

  const removeFromWishlist = (uniqueId) => {
    const updated = wishlistItems.filter((item) => item.uniqueId !== uniqueId);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const moveToCart = (item) => {
    addToCart(
      {
        id: item._id || item.id,
        title: item.title || item.name,
        brand: item.brand || "",
        price: item.price,
        image: item.image,
      },
      item.quantity || 1,
      item.size || null,
      item.color || null
    );

    removeFromWishlist(item.uniqueId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-gray-900 tracking-tight">
        Your Wishlist <FaHeart className="inline-block text-red-500 ml-2" />
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-xl font-medium">
            Your wishlist is empty.
          </p>
          <p className="text-gray-400 mt-2">
            Add some items to start building your dream collection!
          </p>
          <a
            href="/products"
            className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300"
          >
            Shop Now
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-12 gap-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg py-4 px-6 shadow-md">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {wishlistItems.map((item) => (
            <div
              key={item.uniqueId}
              className="bg-white rounded-lg shadow-md px-6 py-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col md:flex-row"
            >
              {/* Product Info */}
              <div className="flex gap-4 items-center col-span-1 md:col-span-5 w-full md:w-auto">
                <Image
                  src={
                    item.image ||
                    "http://localhost:3000/uploads/products/fallback-image.jpg"
                  }
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover w-20 h-20 border border-gray-200"
                  onError={() =>
                    console.error(`Failed to load image for ${item.title}`)
                  }
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800 text-base sm:text-lg hover:text-indigo-600 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Price: ${item.price ? Number(item.price).toFixed(2) : "0.00"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {item.size && `Size: ${item.size}`}{" "}
                    {item.color && `| Color: ${item.color}`}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center w-full md:w-auto mt-2 md:mt-0">
                <input
                  type="number"
                  value={item.quantity || 1}
                  readOnly
                  className="w-20 text-center border border-gray-300 rounded-md py-2 bg-gray-50 text-gray-700 font-medium appearance-number-input"
                />
              </div>

              {/* Subtotal */}
              <div className="col-span-1 md:col-span-2 text-right font-semibold text-gray-900 text-lg w-full md:w-auto mt-2 md:mt-0">
                $
                {item.price && item.quantity
                  ? (Number(item.price) * Number(item.quantity)).toFixed(2)
                  : "0.00"}
              </div>

              {/* Actions */}
              <div className="col-span-1 md:col-span-3 flex justify-start md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0">
                <button
                  onClick={() => moveToCart(item)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.uniqueId)}
                  className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                  aria-label="Remove from wishlist"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
