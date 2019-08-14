import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { listProductsThunk } from '../src/actions/productActions';
import { checkSessionLogin } from './storeReducers/userReducer';
import { getCart } from './storeReducers/cartReducer';
import { Home } from './components/Home';
import Header from './components/Header';
import ErrorList from './components/ErrorList';
import DetailProduct from './components/DetailedProduct';
import { CreateUserForm } from './components/CreateUserForm';
import UserProfile from './components/UserProfile';
import EditProduct from './components/EditProduct';
import UserCart from './components/UserCart';
import Armor from './components/Armor';
import Weapon from './components/Weapon';
import Potion from './components/Potion';
import ClassProducts from './components/ClassProducts';
import CreateProduct from './components/CreateProduct';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.listProductsThunk();
    this.props.getCart();
    this.props.checkSessionLogin();
    this.setState({ loading: false });
  }

  render() {
    return (
      <Router>
        <Header />
        <ErrorList />
        <Route exact path="/" component={Home} />
        <Route exact path="/CreateUserForm" component={CreateUserForm} />
        <Route path="/user/profile" component={UserProfile} />
        <Route path="/myCart" component={UserCart} />
        <Route path="/Armor" component={Armor} />
        <Route path="/Weapon" component={Weapon} />
        <Route path="/Potion" component={Potion} />
        <Route path="/ClassProducts" component={ClassProducts} />
        <Route exact path="/create-product" component={CreateProduct} />
        <Route
          exact
          path="/products/:id"
          render={({ match }) => <DetailProduct match={match} />}
        />
        <Route
          exact
          path="/products/:id/edit"
          render={({ match }) => <EditProduct match={match} />}
        />
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkSessionLogin: () => dispatch(checkSessionLogin()),
  getCart: () => dispatch(getCart()),
  listProductsThunk: () => dispatch(listProductsThunk()),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
