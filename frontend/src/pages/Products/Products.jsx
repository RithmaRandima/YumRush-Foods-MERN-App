import React, { useEffect } from "react";
import ProductsHeader from "../../components/ProductsHeader/ProductsHeader";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Products = () => {
  const [category, setCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ProductsHeader />
      <ExploreMenu setCategory={setCategory} category={category} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Products;
