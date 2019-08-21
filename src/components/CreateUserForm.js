import React from 'react';
import { postUser } from '../storeReducers/userReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CreateUserForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      class: '',
      password: '',
    };
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selector = this.selector.bind(this);
  }
  selector(event) {
    this.setState({
      class: event.target.value,
    });
  }
  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.postUser(this.state);
    document.getElementById('msg').innerHTML = 'Account registered!';
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      class: '',
      password: '',
    });
  }
  render() {
    return (
      <div id='createUser'>
        <form className="CreateUserForm" onSubmit={e => this.onSubmit(e)}>
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
            Register
          </button>
          <center>
            <h3 id="msg"></h3>
          </center>
        </form>
      </div>
    );
  }
}
CreateUserForm.propTypes = {
  postUser: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  postUser: data => dispatch(postUser(data)),
});
export default connect(
  null,
  mapDispatchToProps,
)(CreateUserForm);
