import React from "react";
import { connect } from "react-redux";

// Will probably end up putting these in their own folder
// But for now I think this will suffice
import { CartHeader } from "./CartHeader";
import { UserHeader } from "./UserHeader";

function Header({ user, cart }) {
  return (
    <div className="header">
      <img src="/img/eoLogo.jpeg" />
      <h1>Errant Outfitters Adventure Shop (This is a stub)</h1>
      <CartHeader numberItems={0} />
      <UserHeader user={user} />
    </div>
  );
}

// For the moment this is what I can think of
// May add or take away as needed

// Uncomment when redux stores are made
const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
});

export default connect(mapStateToProps)(Header);
