import React from "react";

class reviewForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "", //make the default author the first name of the user
      body: ""
    };
    this.onHandle = this.onHandle.bind(this);
  }

  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    console.log("REVIEW FORM", this.state);
    return (
      <div>
        <form>
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            value={this.state.title}
            type="text"
            onChange={this.onHandle}
          />

          <label htmlFor="author">Author: </label>
          <input
            name="author"
            type="text"
            value={this.state.author}
            onChange={this.onHandle}
          />
          <label htmlFor="body">Please enter your review: </label>
          <input
            name="body"
            type="text"
            value={this.state.body}
            onChange={this.onHandle}
          />
        </form>
      </div>
    );
  }
}

export default reviewForm;
