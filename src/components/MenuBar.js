import React from 'react';
import { connect } from 'react-redux';

export function MenuBar({ products }) {
  let sortChoice = [];
  function onHandleAll(event) {
    sortChoice = products.productList;
    console.log(sortChoice);
  }
  function onHandleArmor(event) {
    sortChoice = products.productList.filter(a => a.catagory === 'armor');
    console.log(sortChoice);
  }
  function onHandleWeapon(event) {
    sortChoice = products.productList.filter(a => a.catagory === 'weapon');
    console.log(sortChoice);
  }
  function onHandlePotion(event) {
    sortChoice = products.productList.filter(a => a.catagory === 'potion');
    console.log(sortChoice);
  }
  return (
    <div className="menu-bar">
      <form onSubmit={onHandleAll}>
        <button>All Products</button>
        <br />
      </form>
      <form onSubmit={onHandleArmor}>
        <button>Armor</button>
        <br />
      </form>
      <form onSubmit={onHandleWeapon}>
        <button>Weapons</button>
        <br />
      </form>
      <form onSubmit={onHandlePotion}>
        <button>Potions</button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(MenuBar);
