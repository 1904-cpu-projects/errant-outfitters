const path = require("path");
const fs = require("fs");

const {
  db,
  Cart,
  Guest,
  Product,
  Review,
  Transaction,
  User
} = require("./index");

//SEEDS
const cartSeed = [
  { memberStatus: "user", quantity: 2 },
  { memberStatus: "user", quantity: 1 },
  { memberStatus: "user", quantity: 4 },
  { memberStatus: "user", quantity: 100 },
  { memberStatus: "guest", quantity: 2 }
];

const guestSeed = [];

const transactionSeed = [
  { quantity: 1, totalCost: 1 },
  { quantity: 1, totalCost: 1 },
  { quantity: 1, totalCost: 1 },
  { quantity: 1, totalCost: 1 }
];

const seed = {
  cartSeed,
  transactionSeed
};

const syncAndSeed = async () => {
  let src = path.join(__dirname, "seedFiles", "users.json");
  let data = fs.readFileSync(src, "utf8");
  let users = JSON.parse(data);

  src = path.join(__dirname, "seedFiles", "products.json");
  data = fs.readFileSync(src, "utf8");
  const products = JSON.parse(data);

  src = path.join(__dirname, "seedFiles", "reviews.json");
  data = fs.readFileSync(src, "utf8");
  const reviews = JSON.parse(data);

  try {
    await db.sync({ force: true });

    await cartSeed.map(item => {
      Cart.create(item);
    });
    await transactionSeed.map(item => {
      Transaction.create(item);
    });

    const [
      review1,
      review2,
      review3,
      review4,
      review5,
      review6,
      review7,
      review8,
      review9,
      review10
    ] = await Promise.all(reviews.map(review => Review.create({ ...review })));

    const [
      product1,
      product2,
      product3,
      product4,
      product5
    ] = await Promise.all(
      products.map(product => Product.create({ ...product }))
    );

    const [user1, user2, user3, user4] = await Promise.all(
      users.map(user => User.create({ ...user }))
    );

    review1.userId = user1.id;
    review2.userId = user1.id;
    review3.userId = user1.id;
    review4.userId = user2.id;
    review5.userId = user2.id;
    review6.userId = user2.id;
    review7.userId = user3.id;
    review8.userId = user3.id;
    review9.userId = user3.id;
    review10.userId = user3.id;

    review1.productId = product1.id;
    review2.productId = product2.id;
    review3.productId = product3.id;
    review4.productId = product4.id;
    review5.productId = product5.id;
    review6.productId = product1.id;
    review7.productId = product2.id;
    review8.productId = product2.id;
    review9.productId = product3.id;
    review10.productId = product4.id;

    await Promise.all([
      review1.save(),
      review2.save(),
      review3.save(),
      review4.save(),
      review5.save(),
      review6.save(),
      review7.save(),
      review8.save(),
      review9.save(),
      review10.save()
    ]);

    // We need one more user whos id we can count on for login/cart information
    const fixedCart = await Cart.create({
      productId: product1.id,
      memberId: user4.id,
      quantity: 10,
      memberStatus: "user"
    });    
  } catch (err) {
    console.log(err);
  }
};
syncAndSeed();

//EXPORT
module.exports = {
  syncAndSeed,
  seed
};
