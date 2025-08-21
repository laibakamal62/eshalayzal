"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const images = [
  "/assets/hero1.webp",
  "/assets/hero2.webp",
  "/assets/hero4.webp",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      className="
        relative w-full 
        h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] 
        overflow-hidden
      "
    >
      <Image
        src={currentImage}
        alt="Hero Image"
        fill
        className="object-cover w-full h-full"
        priority
      />

      {/* Left Arrow */}
      {/* <button
        onClick={goToPrev}
        className="
          absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 
          bg-black bg-opacity-50 p-2 rounded-full text-white z-10 
          hover:bg-opacity-75
        "
      >
        <AiOutlineLeft size={24} />
      </button> */}

      {/* Right Arrow */}
      {/* <button
        onClick={goToNext}
        className="
          absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 
          bg-black bg-opacity-50 p-2 rounded-full text-white z-10 
          hover:bg-opacity-75
        "
      >
        <AiOutlineRight size={24} />
      </button> */}
    </div>
  );
}
