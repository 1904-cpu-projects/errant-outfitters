import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editUserThunk } from '../storeReducers/userReducer';

class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onHandle = this.onHandle.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onSelect(event) {
    this.setState({ class: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    // const hashedPassword = hashPassword(this.state.password);
    const updateUser = {
      ...this.state,
      // password: hashedPassword,
    };
    this.props.editUserThunk(this.props.user.id, updateUser);
    window.location.hash = '/user/profile';
  }

  render() {
    return (
      <div id="editUser">
        <h3>Please update your info</h3>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="firstName">First Name: </label>
          <input
            onChange={this.onHandle}
            type="text"
            name="firstName"
            defaultValue={this.props.user.firstName}
          />

          <label htmlFor="lastName">Last Name: </label>
          <input
            onChange={this.onHandle}
            type="text"
            name="lastName"
            defaultValue={this.props.user.lastName}
          />

          <label htmlFor="email">Email: </label>
          <input
            onChange={this.onHandle}
            type="email"
            name="email"
            defaultValue={this.props.user.email}
          />

          <label htmlFor="class">Class: </label>
          <select onChange={this.onSelect} defaultValue={this.props.user.class}>
            <option value="warrior">Warrior</option>
            <option value="mage">Mage</option>
            <option value="rouge">Rouge</option>
          </select>
          {/*
          <label htmlFor="password">Password: </label>
          <input
            onChange={this.onHandle}
            type="password"
            name="password"
            placeholder="new password"
          /> */}
          <button type="submit">Submit Changes</button>
        </form>
      </div>
    );
  }
}

EditUser.propTypes = {
  editUserThunk: PropTypes.func,
  user: PropTypes.object,
  id: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editUserThunk: (id, user) => dispatch(editUserThunk(id, user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUser);
