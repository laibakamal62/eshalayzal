"use client";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    { icon: <FaFacebook />, href: "https://www.facebook.com/share/1ZhE7bMM2n/" },
  

  ];

  return (
    <footer className="bg-gradient-to-b from-purple-50 to-purple-100 border-t-4 border-purple-500 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
      >
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-purple-600">Eshal aAyzal Collection</h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Your one-stop shop for premium products at unbeatable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-600 text-sm">
            <li><a href="/" className="hover:text-purple-600 transition">Home</a></li>
            <li><a href="/products" className="hover:text-purple-600 transition">Products</a></li>
            <li><a href="/About" className="hover:text-purple-600 transition">About Us</a></li>
            <li><a href="/profile" className="hover:text-purple-600 transition">Profile</a></li>
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
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
          <div className="mt-4 flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-purple-600 hover:text-purple-800 text-2xl transition"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Eshal Ayzal Collection. All rights reserved.
      </div>
    </footer>
  );
}
