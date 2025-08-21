"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const handleLogoutConfirm = () => {
    logout();
    setShowDropdown(false);
    setShowLogoutModal(false);
    router.push("/");
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-[#5B21B6] text-white px-4 py-4 w-full top-14 md:top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap relative">
          {/* Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="block">
              <div className="text-center leading-tight">
                <h1 className="text-2xl font-bold tracking-wide text-white">
                  <span className="text-white italic font-serif">Eshal</span>
                  <span className="text-white italic font-serif">Ayzal</span>
                </h1>
                <p className="text-xs uppercase tracking-widest text-[#EDE9FE] font-light">
                  Collection
                </p>
              </div>
            </Link>
          </div>

          {/* Nav Links (Desktop Only) */}
          <ul className="hidden md:flex space-x-8 text-md font-medium">
            <li>
              <Link href="/" className="block hover:text-[#C4B5FD]">
                HOME
              </Link>
            </li>
            <li>
              <Link href="/About" className="block hover:text-[#C4B5FD]">
                ABOUT
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-[#C4B5FD]">
                PRODUCTS
              </Link>
            </li>
          </ul>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-3 text-xl">
            <Link
              href="/wishlist"
              className="border border-white rounded-full p-2"
            >
              <FaHeart />
            </Link>

            <Link
              href="/cart"
              className="relative border border-white rounded-full p-2"
            >
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-1 bg-[#4338CA] border border-white text-white text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="border border-white rounded-full p-2"
                >
                  <FaUser />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-44 backdrop-blur-md bg-white/90 rounded-xl shadow-2xl border border-gray-200 z-50 animate-fadeIn overflow-hidden">
                    <Link
                      href="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#4B0082] hover:bg-[#ede9fe] hover:text-[#5B21B6] font-medium transition"
                    >
                      <FaUser className="text-base" /> My Account
                    </Link>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium transition"
                    >
                      <HiOutlineLogout className="text-base" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-2 rounded-full bg-white text-black hover:bg-[#C4B5FD] hover:text-white transition-all duration-200 backdrop-blur-md font-semibold shadow-md"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Icons (Top Right) */}
          <div className="md:hidden flex items-center absolute right-4 top-2 space-x-3 text-[18px]">
            <Link
              href="/wishlist"
              className="border border-white rounded-full p-2"
            >
              <FaHeart />
            </Link>
            <Link
              href="/cart"
              className="relative border border-white rounded-full p-2"
            >
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="border border-white rounded-full p-2"
                >
                  <FaUser />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-44 backdrop-blur-md bg-white/90 rounded-xl shadow-2xl border border-gray-200 z-50 animate-fadeIn overflow-hidden">
                    <Link
                      href="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#4B0082] hover:bg-[#ede9fe] hover:text-[#5B21B6] font-medium transition"
                    >
                      <FaUser className="text-base" /> My Account
                    </Link>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium transition"
                    >
                      <HiOutlineLogout className="text-base" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="border border-white rounded-full p-2"
              >
                <FaUser />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Navbar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50 md:hidden">
        <div className="flex justify-around items-center py-2">
          <Link
            href="/"
            className="flex flex-col items-center text-gray-700 hover:text-indigo-600"
          >
            <AiFillHome className="text-2xl" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link
            href="/products"
            className="flex flex-col items-center text-gray-700 hover:text-indigo-600"
          >
            <MdOutlineCategory className="text-2xl" />
            <span className="text-xs font-medium">Products</span>
          </Link>
          <Link
            href="/About"
            className="flex flex-col items-center text-gray-700 hover:text-indigo-600"
          >
            <AiOutlineInfoCircle className="text-2xl" />
            <span className="text-xs font-medium">About</span>
          </Link>
          <Link
            href={isLoggedIn ? "/profile" : "/login"}
            className="flex flex-col items-center text-gray-700 hover:text-indigo-600"
          >
            <FaUser className="text-2xl" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 border border-black shadow-2xl p-6 w-[90%] max-w-md animate-fadeIn">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-2">
                <HiOutlineLogout className="inline-block" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mt-1">
                Are you sure you want to logout?
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handleLogoutConfirm}
                  className="px-5 py-2.5 bg-red-500 text-white font-medium rounded-full shadow hover:bg-red-600 transition-all duration-200"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-full shadow hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}
