"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard from "@/components/productcard";

export default function CategoryProducts() {
  const { slug } = useParams() || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setError("No category specified");
      setLoading(false);
      return;
    }
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${baseURL}/api/get-products?categorySlug=${slug}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          setError(data.message || "No products found for this category");
        }
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <section className="p-8 font-manrope">
      <h1 className="text-4xl text-gray-800 font-bold mb-6 capitalize">
        {slug ? slug.replace(/-/g, " ") : "Category"} Products
      </h1>

      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        Back to Page
      </Link>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found</p>
      ) : (
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>

      )}
    </section>
  );
}
