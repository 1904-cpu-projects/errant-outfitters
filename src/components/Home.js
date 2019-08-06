import React from "react";

import Products from "./Products";
import MenuBar from "./MenuBar";

export function Home () {
  return (
    <div className='mainview'>
      <Products />
      <MenuBar />
    </div>
  );
}
