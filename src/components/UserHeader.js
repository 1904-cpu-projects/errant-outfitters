import React from "react";
import { loginUser } from "../storeReducers/userReducer";
import axios from "axios";

import store from "../store";

function handleLogin(ev) {
  ev.preventDefault();
  const email = ev.target[0].value;
  const password = ev.target[1].value;
  loginUser(email, password);
}

function handleLogout(ev) {
  ev.preventDefault();
  axios.get("/api/login/logout");
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
        <input
          type="email"
          name="email"
          placeholder="test@test.test"
          required
        />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" required />
        <button>Login</button>
      </form>
      <form onSubmit={handleLogout}>
        <button>Logout</button>
      </form>
    </div>
  );
}
