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
  async componentDidMount() {
    const response = await axios.get("/api/users");
    this.setState({ users: response.data });
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
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="email"
            value={this.state.email}
          />
          <label htmlFor="class">Class (warrior, mage, rogue): </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="class"
            value={this.state.class}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="password"
            value={this.state.password}
          />
          <button>Create User</button>
        </form>
      </div>
    );
  }
}
