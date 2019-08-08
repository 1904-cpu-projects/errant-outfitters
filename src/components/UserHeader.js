import React from "react";
import { loginUser } from "../storeReducers/userReducer";
import store from "../store";

function handleLogin(ev) {
  ev.preventDefault();
  const email = ev.target[0].value;
  const password = ev.target[1].value;
  loginUser(email, password);
}

export function UserHeader({ user }) {
  const checkUser = user ? user.firstName : "guest";
  return (
    <div>
      {" "}
      Hello, {checkUser}{" "}
      <a href="/#/CreateUserForm">
        <button>Create User</button>
      </a>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email: </label>
        <input type="text" name="email" placeholder="class@errant.com" />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" />
        <button>Login</button>
      </form>
    </div>
  );
}
