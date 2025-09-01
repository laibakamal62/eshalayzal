"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <section className="w-full mt-6 py-10 px-4 sm:px-6">
     <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center font-extrabold mb-10 text-gray-900 tracking-wide">
  READY TO WEAR
</h1>


      <div className="max-w-6xl mx-auto flex justify-center">
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 justify-items-center">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug}`}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-gray-300 shadow-sm group-hover:shadow-md transition">
               <img
  src={category.image} // use the Cloudinary URL directly
  alt={category.name}
  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
/>

              </div>

              <h2 className="mt-3 text-sm sm:text-base font-semibold text-gray-800 group-hover:text-black transition">
                {category.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
