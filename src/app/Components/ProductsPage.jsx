"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productcard";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/get-products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl text-gray-800 font-bold mb-6">Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
