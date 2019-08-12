import React from 'react';
import { connect } from 'react-redux';
import { getDetailProduct } from '../storeReducers/productsReducer';

class EditProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      cost: '',
      category: '',
      description: '',
      stock: '',
    };
    this.onHandle = this.onHandle.bind(this);
  }

  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //how to properly pre-fill

  componentDidMount() {
    getDetailProduct(this.props.matchId);
  }

  // how to pre-fill form info?
  componentDidUpdate(prevProps) {
    try {
      if (
        prevProps.matchId !== this.props.matchId ||
        (!prevProps.detailProduct && this.props.detailProduct)
      ) {
        this.setState({
          name: this.props.detailProduct.name,
          cost: this.props.detailProduct.cost,
          description: this.props.detailProduct.description,
          category: this.props.detailProduct.category,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <div>
        <form>
          <label htmlFor="name">Name: </label>
          <input
            //I dont like the use of placeholders in this case
            placeholder={this.props.detailProduct.name}
            name="name"
            onChange={this.onHandle}
            type="text"
            value={this.state.name}
          />

          <label htmlFor="discription">Description: </label>
          <input
            placeholder={this.props.detailProduct.description}
            name="description"
            onChange={this.onHandle}
            type="text"
            value={this.state.description}
          />

          <label htmlFor="category">Category: </label>
          <input
            placeholder={this.props.detailProduct.category}
            name="category"
            onChange={this.onHandle}
            type="text"
            value={this.state.catagory}
          />

          <label htmlFor="cost">Cost: </label>
          <input
            placeholder={this.props.detailProduct.cost}
            name="cost"
            onChange={this.onHandle}
            type="number"
            min="0"
            value={this.state.cost}
          />

          <label htmlFor="stock">Stock: </label>
          <input
            placeholder={this.props.detailProduct.stock}
            name="stock"
            onChange={this.onHandle}
            type="number"
            min="0"
            value={this.state.stock}
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

export default connect(
  mapStateToProps,
  null,
)(EditProduct);
