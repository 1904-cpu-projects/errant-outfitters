import React from 'react';
import Products from './Products';
import MenuBar from './MenuBar';

export function Home({ match }) {
  return (
    <div className="main-view">
      <MenuBar />
      <Products match={match} />
    </div>
  );
}
