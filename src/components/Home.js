import React from 'react';

import Products from './Products';
import MenuBar from './MenuBar';

function Home() {
  return (
    <div className="main-view">
      <MenuBar />
      <Products />
    </div>
  );
}
