import React from 'react';
import { NavLink } from 'react-router-dom';
import { CartHeader } from './CartHeader';

function MenuBar(cart) {
  return (
    <div id="menu-bar">
      <div>
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
      </div>
      <div>
        <NavLink className="navlink" exact to="/costA">
          <button>Cost Asc</button>
        </NavLink>
        <NavLink className="navlink" exact to="/costD">
          <button>Cost Desc</button>
        </NavLink>
        <NavLink className="navlink" exact to="/inStock">
          <button>In Stock</button>
        </NavLink>
        <NavLink className="navlink" exact to="/outStock">
          <button>Out of Stock</button>
        </NavLink>
        <NavLink className="navlink" exact to="/stockA">
          <button>Stock Asc</button>
        </NavLink>
        <NavLink className="navlink" exact to="/stockD">
          <button>Stock Desc</button>
        </NavLink>
      </div>
      <div>
        <form method="get" action="/auth/google">
          <button type="submit" className="btn bg-red white p1 rounded">
            Login with Google
          </button>
        </form>
        <CartHeader cart={cart} />
      </div>
    </div>
  );
}

export default MenuBar;
