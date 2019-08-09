import React from "react";
import axios from "axios";

export class CreateUserForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      class: "",
      password: "",
      users: []
    };
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.create = this.create.bind(this);
    this.selector = this.selector.bind(this);
  }
  selector(event) {
    this.setState({
      class: event.target.value
    });
  }
  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.create(this.state, this.props.history);
    window.location.hash = "/";
  }
  async create(user, history) {
    const response = await axios.post("/api/users", user);
    const users = [...this.state.users, response.data];
    this.setState({ users });
    history.push("/");
  }
  render() {
    return (
      <div>
        <form className="CreateUserForm" onSubmit={this.onSubmit}>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="firstName"
            value={this.state.firstName}
          />
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="lastName"
            value={this.state.lastName}
          />
          <label htmlFor="class">Class: </label>
          <select onChange={this.selector}>
            <option key="0" value="">
              Choose a Class
            </option>
            <option key="1" value="warrior">
              Warrior
            </option>
            <option key="2" value="mage">
              Mage
            </option>
            <option key="3" value="rouge">
              Rouge
            </option>
          </select>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            onChange={this.onHandle}
            name="email"
            placeholder="user@errant.com"
            value={this.state.email}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            onChange={this.onHandle}
            name="password"
            value={this.state.password}
          />
          <button
            disabled={
              !this.state.firstName ||
              !this.state.lastName ||
              !this.state.email ||
              !this.state.class ||
              !this.state.password
                ? true
                : false
            }
          >
            Create User
          </button>
        </form>
      </div>
    );
  }
}
