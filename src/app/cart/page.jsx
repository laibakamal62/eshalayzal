"use client";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { Trash2, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const sanitized = parsed.map((item) => ({
          ...item,
          image:
            item.image.startsWith("http") || item.image.startsWith("/")
              ? item.image
              : `http://localhost:3000/uploads/products/${item.image}`,
          uniqueId:
            item.uniqueId ||
            `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        }));
        setWishlistItems(sanitized);
      } catch (err) {
        console.error("Error parsing wishlist from localStorage", err);
      }
    }
  }, []);

  const toggleWishlist = (item) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existingIndex = wishlist.findIndex(
      (w) => w.id === item.id && w.size === item.size && w.color === item.color
    );

    if (existingIndex !== -1) {
      wishlist.splice(existingIndex, 1);
    } else {
      wishlist.push({
        ...item,
        quantity: 1,
        image:
          item.image.startsWith("http") || item.image.startsWith("/")
            ? item.image
            : `http://localhost:3000/uploads/products/${item.image}`,
      });
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlistItems(wishlist);
  };

  const isInWishlist = (item) => {
    return wishlistItems.some(
      (w) => w.id === item.id && w.size === item.size && w.color === item.color
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.175;
  const total = subtotal + tax;

  return (
    <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-12 py-10 font-sans mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-16">
          Your cart is empty.
        </p>
      ) : (
        <>
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-[#7C3AED] text-white text-sm rounded-md py-3 px-4">
            <div className="col-span-5">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={
                  item.uniqueId ||
                  `${item.id}-${item.size || "none"}-${item.color || "none"}`
                }
                className="bg-white rounded-md shadow-sm px-4 py-4 md:grid grid-cols-12 gap-4 items-center flex flex-col md:flex-row"
              >
                {/* Product Info */}
                <div className="flex gap-4 items-center col-span-5 w-full md:w-auto">
                  <Image
                    src={
                      item.image ||
                      "http://localhost:3000/uploads/products/fallback-image.jpg"
                    }
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover w-16 h-16"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-3 w-full md:w-auto flex justify-start md:justify-center mt-2 md:mt-0">
                  <input
                    type="number"
                    min="1"
                    value={
                      item.quantity && !isNaN(item.quantity) && item.quantity > 0
                        ? item.quantity
                        : 1
                    }
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        item.size,
                        item.color,
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-16 text-center border border-gray-300 rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-purple-300
                    appearance-number-input"
                  />
                </div>

                {/* Subtotal */}
                <div className="col-span-2 w-full md:w-auto text-right font-semibold text-gray-900 mt-2 md:mt-0">
                  ${Number(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Actions */}
                <div className="col-span-2 w-full md:w-auto flex justify-start md:justify-end gap-4 mt-2 md:mt-0 text-gray-500">
                  <button
                    onClick={() => toggleWishlist(item)}
                    className={`${
                      isInWishlist(item)
                        ? "text-red-500"
                        : "text-gray-500 hover:text-pink-500"
                    }`}
                    aria-label={
                      isInWishlist(item)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <Heart size={20} fill={isInWishlist(item) ? "red" : "none"} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id, item.size, item.color)}
                    className="hover:text-red-600"
                    aria-label="Delete item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-12 w-full flex justify-end">
            <div className="w-full sm:max-w-md text-right text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (17.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="flex justify-between font-semibold text-base text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="mt-6 w-full md:w-auto bg-[#7C3AED] hover:bg-purple-700 text-white font-medium text-base px-6 py-3 rounded-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
