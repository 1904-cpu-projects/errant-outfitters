import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// import store is temporary until Thom gets the product thunks done

import { connect } from 'react-redux';
import { getProducts } from './storeReducers/productsReducer';
import { checkSessionLogin } from './storeReducers/userReducer';
import { getCart } from './storeReducers/cartReducer';

import { Home } from './components/Home';
import Header from './components/Header';
import ErrorList from './components/ErrorList';
import DetailProduct from './components/DetailedProduct';
import { CreateUserForm } from './components/CreateUserForm';
import CreateReview from './components/CreateReview';
import UserProfile from './components/UserProfile';
import UserCart from './components/UserCart';
import Armor from './components/Armor';
import Weapon from './components/Weapon';
import Potion from './components/Potion';
import ClassProducts from './components/ClassProducts';
/* I think its reasonable to make this thing be the main provider of redux store
 * And also the thing that routes to other places
 * Lets see how this works!
 */

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    getProducts();
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
        <Route
          path="/products/:id"
          render={({ match }) => <DetailProduct match={match} />}
        />
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkSessionLogin: () => dispatch(checkSessionLogin()),
  getCart: () => dispatch(getCart()),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
