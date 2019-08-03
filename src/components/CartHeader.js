import React from "react";

// numberItems needs to just be a number
// pull in from redux store CartStore I think
export function CartHeader({numberItems = 0}) {
  return(
    <div>
      Cart | {numberItems}
    </div>
  );
}
