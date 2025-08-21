"use client";
import Image from "next/image";
import { FaCheckCircle, FaHeadset, FaShippingFast, FaLock } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-gray-900 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              About EshalAyzal Collection
            </h2>
            <p className="text-base sm:text-lg mb-6 leading-relaxed">
              EshalAyzal Collection is your trusted destination for premium
              products — from elegant fashion and stylish accessories to everyday
              essentials. We are passionate about curating only the best for our
              valued customers.
            </p>
            <p className="text-base sm:text-lg mb-6 leading-relaxed">
              We pride ourselves on providing a seamless shopping experience,
              whether you’re browsing from the comfort of your home or on the go.
              With a secure interface and multiple payment options, finding what
              you love is just a click away.
            </p>
            <p className="text-base sm:text-lg mb-6 leading-relaxed">
              At EshalAyzal Collection, customer satisfaction comes first.
              That’s why we ensure fast shipping, reliable service, and
              hassle-free returns — because shopping should always feel good.
            </p>
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mt-8 bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-600">0.1k+</h3>
                <p className="text-gray-600 text-sm">Vendors</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-600">23k+</h3>
                <p className="text-gray-600 text-sm">Happy Customers</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-600">2k+</h3>
                <p className="text-gray-600 text-sm">Products</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/assets/about.jpeg"
                alt="About EshalAyzal Collection"
                width={600}
                height={450}
                className="object-cover w-full h-[350px] sm:h-[450px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            {
              title: "Product Packing",
              description:
                "Every item is carefully packaged to reach you in perfect condition — because details matter.",
              icon: <FaCheckCircle className="w-8 h-8 text-purple-600" />,
            },
            {
              title: "24/7 Support",
              description:
                "Our dedicated team is here for you anytime, ensuring smooth and stress-free shopping.",
              icon: <FaHeadset className="w-8 h-8 text-purple-600" />,
            },
            {
              title: "Fast Delivery",
              description:
                "We ship your orders quickly and reliably, so your favorites arrive within just a few days.",
              icon: <FaShippingFast className="w-8 h-8 text-purple-600" />,
            },
            {
              title: "Secure Payments",
              description:
                "Shop with confidence knowing every transaction is safe and protected.",
              icon: <FaLock className="w-8 h-8 text-purple-600" />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
