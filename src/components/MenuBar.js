import React from 'react';
import { NavLink } from 'react-router-dom';

function MenuBar({ classProdUsr }) {
  return (
    <div className="menu-bar">
      <NavLink className="navlink" exact to="/">
        <button>All Products</button>
      </NavLink>
      <NavLink className="navlink" exact to="/Armor">
        <button>Armor</button>
      </NavLink>
      <NavLink className="navlink" exact to="/Weapon">
        <button>Weapons</button>
      </NavLink>
      <NavLink className="navlink" exact to="/Potion">
        <button>Potions</button>
      </NavLink>
      <NavLink className="navlink" exact to="/ClassProducts">
        <button>
          {classProdUsr
            ? classProdUsr.charAt(0).toUpperCase() + classProdUsr.slice(1)
            : ''}{' '}
          Class Products
        </button>
      </NavLink>
    </div>
  );
}

export default MenuBar;
