import React from "react";
import { loginUser } from "../storeReducers/userReducer";
import store from "../store";

function handleLogin(ev) {
  ev.preventDefault();
  // console.log("we called this function");
  const email = ev.target[0].value;
  const password = ev.target[1].value;
  // console.log("email and pass", email, " ", password);
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
        <input
          type="text"
          // onChange={this.onHandle}
          name="email"
          placeholder="class@errant.com"
          // value={this.state.email}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          // onChange={this.onHandle}
          name="password"
          // value={this.state.password}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
