import React from "react";

export function UserHeader({userName = 'guest'}) {
  return (
    <div>
      Hello, {userName}
    </div>
  );
}
