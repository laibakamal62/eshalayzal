"use client";
import { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Update auth context
      login(data.token, data.user);

      // Redirect to homepage
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-300 to-indigo-400 overflow-hidden">
      <div className="flex w-full max-w-6xl h-[500px] bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-white/30">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-purple-800 to-indigo-700 text-white flex flex-col justify-center items-start px-10 py-16 space-y-6">
          <h2 className="text-4xl font-extrabold animate-fade-in drop-shadow-md">
            Welcome to
          </h2>
          <h3 className="text-3xl font-bold tracking-tight">
            Eshal & Ayzal Collection
          </h3>
          <p className="text-base text-white/90 pr-6 leading-relaxed">
            Explore a world of fashion, beauty, and exclusive deals. Shop smart
            and stay stylish with our collection.
          </p>
          <Link href="/signup">
            <button className="mt-10 bg-white text-purple-800 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out">
              Don’t have an account? <span className="font-bold">Sign Up</span>
            </button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-center px-12 py-16 bg-white rounded-tr-2xl rounded-br-2xl">
          <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-10 animate-slide-up">
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="mb-6 relative group">
              <FaUser className="absolute top-3.5 left-4 text-purple-400 group-hover:text-purple-600 transition-colors duration-300" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition-all duration-300"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-8 relative group">
              <FaLock className="absolute top-3.5 left-4 text-purple-400 group-hover:text-purple-600 transition-colors duration-300" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition-all duration-300"
                required
              />
              <span
                className="absolute top-3.5 right-4 cursor-pointer text-gray-500 hover:text-purple-600 transition-colors duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            {/* Link */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-purple-700 font-semibold hover:underline hover:text-purple-800 transition-colors duration-300"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
