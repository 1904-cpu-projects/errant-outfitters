import React from 'react';
import { NavLink } from 'react-router-dom';

function selector(e) {
  window.location.hash = e.target.value;
}

function MenuBar() {
  return (
    <div id="menu-bar">
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
      <NavLink className="navlink" exact to="/ClassProducts">
        <button>Class Products</button>
      </NavLink>
      <div id="menu-bar">
        <select onChange={selector}>
          <option key="0" value="">
            Sort Options
          </option>
          <option key="1" value="/costA">
            Product Cost Ascending
          </option>
          <option key="2" value="/costD">
            Product Cost Descending
          </option>
          <option key="3" value="/stockA">
            Stock Count Ascending
          </option>
          <option key="4" value="/stockD">
            Stock Count Descending
          </option>
          <option key="5" value="/inStock">
            In Stock
          </option>
          <option key="6" value="/outStock">
            Out of Stock
          </option>
          <option key="7" value="/warrior">
            Product Class: Warrior
          </option>
          <option key="8" value="/mage">
            Product Class: Mage
          </option>
          <option key="9" value="/rouge">
            Product Class: Rouge
          </option>
          <option key="10" value="/pnameA">
            Product Name Ascending
          </option>
          <option key="11" value="/pnameD">
            Product Name Descending
          </option>
        </select>
      </div>
    </div>
  );
}

export default MenuBar;
