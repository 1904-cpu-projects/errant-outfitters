import React from 'react';
import { connect } from 'react-redux';
import { postProductThunk } from '../actions/productActions';
import PropTypes from 'prop-types';

class CreateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      image: '',
      category: 'armor',
      stock: '',
      cost: '',
      class: 'warrior',
    };

    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCategorySelection = this.onCategorySelection.bind(this);
    this.onInstockSelection = this.onInstockSelection.bind(this);
    this.onClassSelection = this.onClassSelection.bind(this);
  }

  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onCategorySelection(event) {
    this.setState({
      category: event.target.value,
    });
  }

  onClassSelection(event) {
    this.setState({
      class: event.target.value,
    });
  }

  onInstockSelection(event) {
    this.setState({
      inStock: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.postProductThunk(this.state);
    window.location.hash = '/';
  }

  render() {
    return (
      <div className="create-product-form">
        <h1>Add a new product to the set</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            onChange={this.onHandle}
            type="text"
            name="name"
            value={this.state.name}
            required
          />

          <label htmlFor="description">Description: </label>
          <textarea
            onChange={this.onHandle}
            type="text"
            value={this.state.description}
            name="description"
            required
          />

          <label htmlFor="image">Image: </label>
          <input
            onChange={this.onHandle}
            type="text"
            value={this.state.image}
            name="image"
            required
          />

          <label htmlFor="inStock">inStock: </label>
          <select onChange={this.onInstockSelection} value={this.state.inStock}>
            <option value="false">false</option>
            <option value="true">true</option>
          </select>

          <label htmlFor="stock">Stock: </label>
          <input
            onChange={this.onHandle}
            name="stock"
            type="number"
            min="0"
            value={this.state.stock}
            required
          />

          <label htmlFor="cost">Cost: </label>
          <input
            onChange={this.onHandle}
            name="cost"
            type="number"
            min="0"
            value={this.state.cost}
            required
          />

          <label htmlFor="category">Category: </label>
          <select
            onChange={this.onCategorySelection}
            value={this.state.category}
          >
            <option key="1" value="armor">
              Armor
            </option>
            <option key="2" value="weapon">
              Weapon
            </option>
            <option key="3" value="potion">
              Potion
            </option>
          </select>

          <label htmlFor="class">Class: </label>
          <select onChange={this.onClassSelection} value={this.state.class}>
            <option key="1" value="mage">
              Mage
            </option>
            <option key="2" value="warrior">
              Warrior
            </option>
            <option key="3" value="rouge">
              Rouge
            </option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

CreateProduct.propTypes = {
  postProductThunk: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    postProductThunk: thing => dispatch(postProductThunk(thing)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateProduct);
