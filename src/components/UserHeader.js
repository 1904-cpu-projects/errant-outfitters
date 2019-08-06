import React from "react";

export function UserHeader({ userName = "guest" }) {
  return (
    <div>
      Hello, {userName} <br />
      <a href="/#/CreateUserForm">Create User</a>
    </div>
  );
}
