"use client"
import Hero from "@/components/hero";

import AllProducts from "./Components/ProductsPage";
import AllCategories from "./Components/AllCategories";
import { useEffect } from "react";
export default function Home() {
useEffect(()=> {
    console.log(process.env.NEXT_PUBLIC_API_URL, 'TESTENV')

})
  return (
    <div>
      <div className="mt-5">

      <Hero />


      </div>
<AllCategories/>
<AllProducts/>  

    </div>
  );
}