import React from "react";
import { loginUser, logoutUser } from "../storeReducers/userReducer";
import axios from "axios";
import UserProfile from "./UserProfile";
import store from "../store";

function handleLogin(ev) {
  ev.preventDefault();
  const email = ev.target[0].value;
  const password = ev.target[1].value;
  loginUser(email, password);
}

function handleLogout(ev) {
  ev.preventDefault();
  logoutUser();
}

export function UserHeader({ user }) {
  if (user.id === undefined) {
    return (
      <div>
        {" "}
        Hello, Guest{" "}
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
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        Hello, {user.firstName} {user.lastName}{" "}
        {user ? <a href="#/user/profile">PROFILE</a> : ""}
        <form onSubmit={handleLogout}>
          <button>Logout</button>
        </form>
      </div>
    );
  }
}
