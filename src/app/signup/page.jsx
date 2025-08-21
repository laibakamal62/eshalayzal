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

      // Store token (e.g., in localStorage or cookies)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to homepage or dashboard
      router.push("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-purple-300 to-indigo-400 px-4 overflow-hidden">
      <div className="flex w-full max-w-5xl h-[500px] bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-white/30 transform transition-all duration-500 hover:shadow-2xl">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-br from-purple-700 to-indigo-700 text-white flex flex-col justify-center items-center px-10 py-8 space-y-4 text-center">
          <h2 className="text-4xl font-extrabold leading-tight drop-shadow-md animate-fade-in">Join Esha & Ayzal Collection</h2>
          <p className="text-base text-white/90 leading-relaxed max-w-md">
            Launch your brand with our Shopify-like platform. Manage inventory, track orders, and grow your business with ease and style.
          </p>
          <Link href="/login">
            <button className="mt-4 bg-white text-purple-800 font-semibold px-8 py-2 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out">
              Already have an account? <span className="font-bold">Login</span>
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col justify-center px-12 py-8 bg-white rounded-tr-2xl rounded-br-2xl shadow-inner">
          <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-8 animate-slide-up">Sign Up</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                required
              />
            </div>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                required
              />
            </div>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                required
              />
              <span
                className="absolute top-2.5 right-5 cursor-pointer text-gray-500 hover:text-purple-600 transition-colors duration-300"
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
                className="w-full px-5 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                required
              />
              <span
                className="absolute top-2.5 right-5 cursor-pointer text-gray-500 hover:text-purple-600 transition-colors duration-300"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50"
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
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}