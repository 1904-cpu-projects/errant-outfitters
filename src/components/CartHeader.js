import React from "react";

// numberItems needs to just be a number
// pull in from redux store CartStore I think
export function CartHeader({cart = []}) {
  return(
    <div>
      Cart | {cart.length}
    </div>
  );
}
