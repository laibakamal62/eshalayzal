"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { addToCart } = useCart();
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (!id) return;

    fetch(`${baseURL}/api/get-products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
          setSelectedImage(data.product.image);
          if (data.product.variations?.length > 0) {
            setSelectedVariation(null);
          }
        } else {
          console.error("Product not found");
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(
      {
        id: product._id,
        title: product.name,
        brand: product.brand,
        price: selectedVariation?.price || product.price,
        image: selectedVariation?.image || product.image,
      },
      1,
      null,
      selectedVariation?.color || null
    );

    toast.success(`${product.name} added to cart!`);
  };

  if (!product)
    return (
      <p className="text-center mt-10 text-lg font-semibold animate-pulse text-purple-500">
        Loading product details...
      </p>
    );

  return (
    <div className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 min-h-screen">
      <div className="max-w-6xl mt-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <div
            className="relative group cursor-zoom-in"
            onClick={() => setIsZoomed(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
  src={selectedImage} // <-- use the full URL directly
                alt={product.name}
                className="object-contain w-[480px] h-[480px] shadow-2xl border-white/50"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onError={() => console.error(`Failed to load image: ${selectedImage}`)}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-40 rounded-3xl transition"></div>
          </div>

          <div className="flex gap-4 flex-wrap mt-6 justify-center">
            <motion.img
              whileHover={{ scale: 1.1 }}
  src={product.image} // just use the URL directly
              alt={product.name}
              className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer transition ${
                selectedImage === product.image
                  ? "border-purple-500 shadow-lg"
                  : "border-gray-300"
              }`}
              onClick={() => {
                setSelectedImage(product.image);
                setSelectedVariation(null);
              }}
            />
            {product.variations?.map(
              (v, idx) =>
                v.image && (
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    key={idx}
  src={v.image} // just use the URL directly
                    alt={v.color || `Variation ${idx + 1}`}
                    className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer transition ${
                      selectedImage === v.image
                        ? "border-purple-500 shadow-lg"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedImage(v.image);
                      setSelectedVariation(v);
                    }}
                  />
                )
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative p-8"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#7C3AED] bg-clip-text truncate w-full">
  {product.name}
</h1>

          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available"}
            </p>
          </div>

         {product.brand && (
  <p className="text-gray-800 text-xl mb-2">
    Brand:{" "}
    <span className="font-bold text-gray-800">{product.brand}</span>
  </p>
)}

          <p className="text-gray-800 text-xl mt-4 mb-6 font-bold">
            Stock:{" "}
            <span
              className={`font-medium ${
                product.stock > 0 ? "text-[#7C3AED]" : "text-red-600"
              }`}
            >
              {product.stock} in stock
            </span>
          </p>

          <p className="text-2xl font-semibold text-[#7C3AED] mb-6">
            RS.{selectedVariation?.price || product.price}
          </p>

          {product.variations?.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Available Colors
              </h3>
              <div className="flex gap-3 mb-6 flex-wrap">
  {product.variations.map((v, idx) => (
    <button
      key={idx}
      onClick={() => {
        setSelectedVariation(v);
        setSelectedImage(v.image || product.image);
      }}
      className={`px-4 py-2 rounded border text-sm font-medium transition ${
        selectedVariation?.color === v.color
          ? "bg-purple-600 text-white border-purple-600"
          : "bg-white text-gray-800 border-gray-300 hover:bg-purple-50"
      }`}
    >
      {v.color}
    </button>
  ))}
</div>

            </>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r text-white bg-[#7C3AED] px-10 py-4 font-semibold shadow-lg overflow-hidden group"
          >
            <span className="relative z-10">Add to Cart</span>
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
  src={selectedImage} // <-- use the full URL directly
              alt={product.name}
              className="max-h-[90%] max-w-[90%] object-contain rounded-lg shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}