import React from "react";

import Products from "./Products";
import MainView from "./MainView";

export function Home () {
  return (
    <div className='mainview'>
      <Products />
      <MainView />
    </div>
  );
}
