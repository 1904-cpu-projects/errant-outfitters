import React from 'react';

function MenuBar({ products }) {
  return (
    <div className="menu-bar">
      <a href="/#/">
        <button>All Products</button>
      </a>
      <a href="/#/Armor">
        <button>Armor</button>
      </a>
      <a href="/#/Weapon">
        <button>Weapon</button>
      </a>
      <a href="/#/Potion">
        <button>Potion</button>
      </a>
      <br />
    </div>
  );
}

export default MenuBar;
