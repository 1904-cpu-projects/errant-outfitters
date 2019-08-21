import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editProductThunk,
  singleProductThunk,
} from '../actions/productActions';

class EditProduct extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.editProductThunk(this.props.matchId, this.state);
    window.location.hash = '/';
  }

  componentDidMount() {
    this.props.singleProductThunk(this.props.matchId);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            defaultValue={this.props.detailProduct.name}
            name="name"
            onChange={this.onHandle}
            type="text"
          />

          <label htmlFor="discription">Description: </label>
          <input
            defaultValue={this.props.detailProduct.description}
            name="description"
            onChange={this.onHandle}
            type="text"
          />

          <label htmlFor="category">Category: </label>
          <input
            defaultValue={this.props.detailProduct.category}
            name="category"
            onChange={this.onHandle}
            type="text"
          />

          <label htmlFor="cost">Cost: </label>
          <input
            defaultValue={this.props.detailProduct.cost}
            name="cost"
            onChange={this.onHandle}
            type="number"
            min="0"
          />

          <label htmlFor="stock">Stock: </label>
          <input
            defaultValue={this.props.detailProduct.stock}
            name="stock"
            onChange={this.onHandle}
            type="number"
            min="0"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

EditProduct.propTypes = {
  singleProductThunk: PropTypes.func,
  editProductThunk: PropTypes.func,
  createItem: PropTypes.func,
  matchId: PropTypes.string,
  user: PropTypes.object,
  detailProduct: PropTypes.object,
  cost: PropTypes.number,
  stock: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
  return {
    detailProduct: state.products.detailProduct,
    matchId: ownProps.match.params.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProductThunk: (id, newItem) => dispatch(editProductThunk(id, newItem)),
    singleProductThunk: id => dispatch(singleProductThunk(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProduct);
