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
            <h2 className="text-4xl sm:text-5xl font-abold mb-6 bg-clip-text  text-[#7C3AED] ">
              About Our Store
            </h2>
            <p className="text-base sm:text-lg mb-6 leading-relaxed">
              HiBuy is your one-stop online shopping destination, offering a vibrant selection of products—from trendy apparel and stylish accessories to cutting-edge electronics. We cater to every shopper's unique needs with a seamless experience.
            </p>
            <p className="text-base sm:text-lg mb-6 leading-relaxed">
              Enjoy a secure and intuitive shopping experience with multiple payment options and a user-friendly interface, whether you're at home or on the go. Find what you love in just a few clicks.
            </p>
            <p className="text-base sm:text-lg mb-6 leading-relaxed">
              At HiBuy, we prioritize quality and customer satisfaction. With fast shipping, hassle-free returns, and exceptional service, we ensure your shopping journey is delightful from start to finish.
            </p>
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mt-8 bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#7C3AED]">0.1k</h3>
                <p className="text-gray-600 text-sm">Vendors</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#7C3AED]">23k</h3>
                <p className="text-gray-600 text-sm">Customers</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#7C3AED]">2k</h3>
                <p className="text-gray-600 text-sm">Products</p>
              </div>
            </div>
          </div>
          {/* Image Section */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/assets/about.jpeg"
                alt="About HiBuy"
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
              description: "Every item is carefully packaged to ensure it arrives in pristine condition, giving you peace of mind.",
              icon: <FaCheckCircle className="w-8 h-8 text-[#7C3AED]" />,
            },
            {
              title: "24/7 Support",
              description: "Our dedicated team is available around the clock to assist with any questions or concerns.",
              icon: <FaHeadset className="w-8 h-8 text-[#7C3AED]" />,
            },
            {
              title: "Delivery in 5 Days",
              description: "Fast, reliable shipping ensures your products arrive quickly, typically within five days.",
              icon: <FaShippingFast className="w-8 h-8 text-[#7C3AED]" />,
            },
            {
              title: "Payment Secure",
              description: "Shop with confidence knowing that all payments are protected with the highest security standards.",
              icon: <FaLock className="w-8 h-8 text-[#7C3AED]" />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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