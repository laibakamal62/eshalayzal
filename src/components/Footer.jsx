"use client";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    { icon: <FaFacebook />, href: "https://facebook.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaTwitter />, href: "https://twitter.com" },
    { icon: <FaLinkedin />, href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-gradient-to-b from-purple-50 to-purple-100 border-t-4 border-purple-500 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-purple-600">ShopMaster</h2>
          <p className="mt-3 text-gray-600 text-sm">
            Your one-stop shop for premium products at unbeatable prices.
          </p>
          <div className="flex gap-3 mt-4">
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 text-lg p-2 bg-white rounded-full shadow hover:shadow-lg hover:text-pink-500 transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-purple-500">Home</a></li>
            <li><a href="#" className="hover:text-purple-500">Shop</a></li>
            <li><a href="About" className="hover:text-purple-500">About Us</a></li>
            <li><a href="#" className="hover:text-purple-500">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Customer Service</h3>
          <ul className="mt-3 space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-purple-500">FAQ</a></li>
            <li><a href="#" className="hover:text-purple-500">Returns</a></li>
            <li><a href="#" className="hover:text-purple-500">Shipping Info</a></li>
            <li><a href="#" className="hover:text-purple-500">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Join Our Newsletter</h3>
          <p className="mt-3 text-sm text-gray-600">
            Get the latest deals and updates straight to your inbox.
          </p>
          <form className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-pink-500 text-white px-6 py-2 rounded-lg shadow"
            >
              Subscribe
            </button>
          </form>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopMaster. All rights reserved.
      </div>
    </footer>
  );
}
