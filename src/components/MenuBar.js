import React from 'react';
import { NavLink } from 'react-router-dom';

function MenuBar() {
  return (
    <div className="menu-bar">
      <NavLink className="navlink" exact to="/">
        <button>All Products</button>
      </NavLink>
      <NavLink className="navlink" exact to="/armor">
        <button>Armor</button>
      </NavLink>
      <NavLink className="navlink" exact to="/weapon">
        <button>Weapons</button>
      </NavLink>
      <NavLink className="navlink" exact to="/potion">
        <button>Potions</button>
      </NavLink>
      <NavLink className="navlink" exact to="/inStock">
        <button>In Stock</button>
      </NavLink>
      <NavLink className="navlink" exact to="/outStock">
        <button>Out of Stock</button>
      </NavLink>
      <NavLink className="navlink" exact to="/ClassProducts">
        <button>Class Products</button>
      </NavLink>
    </div>
  );
}

export default MenuBar;
