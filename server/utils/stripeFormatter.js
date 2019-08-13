function stripeFormatter(cart) {
  const formattedCart = cart.map( (item) => {
    console.log(item)
  });
  return formattedCart
};

module.exports = stripeFormatter
