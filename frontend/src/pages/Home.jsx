import React, { useState } from "react";
import Header from "../components/Header";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";

export default function Home() {

  const [category, setCategory] = useState("All")

  return (
    <div className="mx-1 sm:mx-0">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  );
}
