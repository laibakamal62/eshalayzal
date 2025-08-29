"use client";
import Image from "next/image";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = storedWishlist.some(
      (item) => item._id === product._id
    );
    setIsInWishlist(isProductInWishlist);
  }, [product._id]);

  const handleWishlistToggle = () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = storedWishlist.filter((item) => item._id !== product._id);
      toast.error("Removed from wishlist");
    } else {
      updatedWishlist = [...storedWishlist, product];
      toast.success("Added to wishlist");
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsInWishlist(!isInWishlist);
  };

  const displayPrice = product.price
    ? `Rs. ${parseFloat(product.price).toFixed(0)}`
    : "N/A";

  return (
    <div className="mt-4 max-w-xs w-full overflow-hidden font-manrope">
      <div className="relative">
        <Link href={`/products/${product._id}`}>
          <div className="w-full h-80 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-3 flex items-center justify-center">
<img
  src={product.image}
  alt={product.name}
  className="max-h-full max-w-full object-contain"
/>

</div>

        </Link>
        <motion.button
          onClick={handleWishlistToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition"
        >
          <FaHeart
            className={`text-lg transition ${
              isInWishlist ? "text-rose-500 fill-rose-500" : "text-gray-400"
            }`}
          />
        </motion.button>
      </div>

      <div className="px-4 pb-5 pt-2">
        {/* Name & Category: vertical on mobile, horizontal on larger screens */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
<h2 className="text-sm sm:text-md md:text-lg font-semibold text-gray-800 truncate w-full">
  {product.name}
</h2>
          <p className="text-sm text-gray-500 capitalize mt-1 sm:mt-0">{product.category}</p>
        </div>

        {/* Price */}
        <p className="text-[16px] font-extrabold text-gray-900 mt-3">
          Price: {displayPrice}
        </p>

        {/* Details Button */}
        <Link href={`/products/${product._id}`}>
          <button className="mt-4 w-full cursor-pointer flex items-center justify-center gap-2 bg-[#7C3AED] text-white py-2 font-medium transition">
            <FaShoppingCart className="text-lg" />
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}
