"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-purple-300 to-indigo-400 px-4 py-6 overflow-auto">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl min-h-[500px] bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-white/30 transform transition-all duration-500 hover:shadow-2xl">
        
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-700 to-indigo-700 text-white flex flex-col justify-center items-center lg:items-start px-6 sm:px-10 py-10 space-y-4 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-md animate-fade-in">
            Join Esha & Ayzal Collection
          </h2>

          {/* Description hidden on mobile */}
          <p className="hidden md:block text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
            Launch your brand with our Shopify-like platform. Manage inventory, track orders, and grow your business with ease and style.
          </p>

          <Link href="/login" className="w-full sm:w-auto">
            <button className="mt-4 w-full sm:w-auto bg-white text-purple-800 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out">
              Already have an account? <span className="font-bold">Login</span>
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-10 bg-white rounded-t-2xl lg:rounded-tr-2xl lg:rounded-br-2xl shadow-inner">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-purple-800 mb-6 sm:mb-8 animate-slide-up">
            Sign Up
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
              required
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
              required
            />

            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
                required
              />
              <span
                className="absolute top-3 right-5 cursor-pointer text-gray-500 hover:text-purple-600 transition-colors duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>

            <div className="relative group">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
                required
              />
              <span
                className="absolute top-3 right-5 cursor-pointer text-gray-500 hover:text-purple-600 transition-colors duration-300"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50"
            >
              {loading ? "Creating account..." : "CREATE ACCOUNT"}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}
