import Hero from "@/components/hero";

import AllProducts from "./Components/ProductsPage";
import AllCategories from "./Components/AllCategories";
export default function Home() {

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