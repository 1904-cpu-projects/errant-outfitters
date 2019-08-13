import React from 'react';
import { connect } from 'react-redux';
import { getDetailProduct } from '../storeReducers/productsReducer';
import { editProductThunk } from '../actions/productActions';

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
    window.location.hash = '/#/';
  }

  //how to properly pre-fill

  componentDidMount() {
    getDetailProduct(this.props.matchId);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            //I dont like the use of placeholders in this case
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

const mapStateToProps = (state, ownProps) => {
  return {
    detailProduct: state.products.detailProduct,
    matchId: ownProps.match.params.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProductThunk: (id, newItem) => dispatch(editProductThunk(id, newItem)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProduct);
