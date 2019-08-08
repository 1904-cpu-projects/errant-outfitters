import React from "react";
import { connect } from "react-redux";
import { postReview } from "../actions/reviewActions";

class CreateReview extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      email: "", //make the default author the emal of the user
      body: ""
    };
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.postReview(this.state);
  }

  render() {
    console.log("REVIEW FORM", this.props);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            value={this.state.title}
            type="text"
            onChange={this.onHandle}
          />

          <label htmlFor="email">Email: </label>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onHandle}
          />
          <label htmlFor="body">Please enter your review: </label>
          <input
            name="body"
            type="text"
            value={this.state.body}
            onChange={this.onHandle}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postReview: stuff => dispatch(postReview(stuff))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateReview);
