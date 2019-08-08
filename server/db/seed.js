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

const reviews = [
  {
    title: "Review-1",
    email: "larry@acme.com",
    body:
      "Donec magna ex, iaculis ut augue sed, aliquet aliquam tellus. Mauris dolor lectus, venenatis non ultrices ut, cursus non diam. Proin sagittis, ligula a mollis mollis, ipsum felis consectetur libero, nec pharetra odio arcu eu mauris. Pellentesque mi nibh, interdum non porttitor sit amet, hendrerit in nisl."
  },
  {
    title: "Review-2",
    email: "rouge@acme.com",
    body:
      "Aenean quis purus augue. Duis massa ipsum, ultrices vitae augue eget, tristique ultrices turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius nisl orci, sit amet vehicula nulla porta nec. Nunc commodo varius nibh. Sed id ornare purus. Etiam eros urna, gravida sed orci vel, efficitur suscipit turpis. Nulla nec sapien placerat, imperdiet eros a, malesuada augue."
  },
  {
    title: "Review-3",
    email: "boop@acme.com",
    body:
      "Sed nec pharetra sem. Duis bibendum quis est ut blandit. Suspendisse dignissim, elit ut sodales imperdiet, ligula orci finibus odio, in consequat magna enim facilisis ante. Suspendisse tempor nunc odio, quis consectetur eros tincidunt quis. Proin sollicitudin sapien eget eros commodo, id aliquam erat blandit. Aenean molestie diam quam, vel volutpat metus lacinia a. Nunc id pretium tortor. Ut nec neque facilisis, laoreet lectus sed, pretium lorem. "
  },
  {
    title: "Review-4",
    email: "boop@acme.com",
    body:
      "Sed nec pharetra sem. Duis bibendum quis est ut blandit. Suspendisse dignissim, elit ut sodales imperdiet, ligula orci finibus odio, in consequat magna enim facilisis ante. Suspendisse tempor nunc odio, quis consectetur eros tincidunt quis. Proin sollicitudin sapien eget eros commodo, id aliquam erat blandit. Aenean molestie diam quam, vel volutpat metus lacinia a. Nunc id pretium tortor. Ut nec neque facilisis, laoreet lectus sed, pretium lorem. "
  },
  {
    title: "Review-5",
    email: "rouge@acme.com",
    body:
      "Sed nec pharetra sem. Duis bibendum quis est ut blandit. Suspendisse dignissim, elit ut sodales imperdiet, ligula orci finibus odio, in consequat magna enim facilisis ante. Suspendisse tempor nunc odio, quis consectetur eros tincidunt quis. Proin sollicitudin sapien eget eros commodo, id aliquam erat blandit. Aenean molestie diam quam, vel volutpat metus lacinia a. Nunc id pretium tortor. Ut nec neque facilisis, laoreet lectus sed, pretium lorem. "
  },
  {
    title: "Review-6",
    email: "larry@acme.com",
    body:
      "Donec magna ex, iaculis ut augue sed, aliquet aliquam tellus. Mauris dolor lectus, venenatis non ultrices ut, cursus non diam. Proin sagittis, ligula a mollis mollis, ipsum felis consectetur libero, nec pharetra odio arcu eu mauris. Pellentesque mi nibh, interdum non porttitor sit amet, hendrerit in nisl."
  },
  {
    title: "Review-7",
    email: "rouge@acme.com",
    body:
      "Aenean quis purus augue. Duis massa ipsum, ultrices vitae augue eget, tristique ultrices turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius nisl orci, sit amet vehicula nulla porta nec. Nunc commodo varius nibh. Sed id ornare purus. Etiam eros urna, gravida sed orci vel, efficitur suscipit turpis. Nulla nec sapien placerat, imperdiet eros a, malesuada augue."
  },
  {
    title: "Review-8",
    email: "boop@acme.com",
    body:
      "Sed nec pharetra sem. Duis bibendum quis est ut blandit. Suspendisse dignissim, elit ut sodales imperdiet, ligula orci finibus odio, in consequat magna enim facilisis ante. Suspendisse tempor nunc odio, quis consectetur eros tincidunt quis. Proin sollicitudin sapien eget eros commodo, id aliquam erat blandit. Aenean molestie diam quam, vel volutpat metus lacinia a. Nunc id pretium tortor. Ut nec neque facilisis, laoreet lectus sed, pretium lorem. "
  },
  {
    title: "Review-9",
    email: "boop@acme.com",
    body:
      "Sed nec pharetra sem. Duis bibendum quis est ut blandit. Suspendisse dignissim, elit ut sodales imperdiet, ligula orci finibus odio, in consequat magna enim facilisis ante. Suspendisse tempor nunc odio, quis consectetur eros tincidunt quis. Proin sollicitudin sapien eget eros commodo, id aliquam erat blandit. Aenean molestie diam quam, vel volutpat metus lacinia a. Nunc id pretium tortor. Ut nec neque facilisis, laoreet lectus sed, pretium lorem. "
  },
  {
    title: "Review-10",
    email: "rouge@acme.com",
    body:
      "Sed nec pharetra sem. Duis bibendum quis est ut blandit. Suspendisse dignissim, elit ut sodales imperdiet, ligula orci finibus odio, in consequat magna enim facilisis ante. Suspendisse tempor nunc odio, quis consectetur eros tincidunt quis. Proin sollicitudin sapien eget eros commodo, id aliquam erat blandit. Aenean molestie diam quam, vel volutpat metus lacinia a. Nunc id pretium tortor. Ut nec neque facilisis, laoreet lectus sed, pretium lorem. "
  }
];

const products = [
  {
    cost: 20,
    description:
      "The armored kilt is made of a thick cloth skirt with bars of steel hanging down from the waist and a ring of horizontal steel plates just above the hem. An armored kilt can be worn separately as light armor, or it can be added to other suits of light or medium armor.",
    image: "/img/products/armored-kilt.jpg",
    inStock: true,
    name: "Armored Kilt",
    stock: 12
  },
  {
    cost: 3,
    description:
      "Also called a belly-warmer, a haramaki is a simple silken sash lined with chainmail or articulated metal plates and tied about the stomach to protect it.",
    image: "/img/products/Haramaki.jpg",
    inStock: true,
    name: "Haramaki",
    stock: 13
  },
  {
    cost: 3,
    description:
      "More than simple clothing, padded armor combines heavy, quilted cloth and layers of densely packed stuffing to create a cheap and basic protection. It is typically worn by those not intending to face lethal combat or those who wish their maneuverability to be impacted as little as possible.",
    image: "/img/products/Light-Armor.png",
    inStock: true,
    name: "Light Armor",
    stock: 14
  },
  {
    cost: 1,
    description:
      "Sometimes called a leine, this belted tunic has thick cords woven through it that cover vital areas. A reinforced tunic’s armor bonus is increased by 2 against attack rolls made to confirm critical hits against the wearer.",
    image: "/img/products/Tunic.jpg",
    inStock: false,
    name: "Reinforced Tunic",
    stock: 0
  },
  {
    cost: 15,
    description:
      "Lamellar is a type of armor in which small plates of various types of materials are strung together in parallel rows using fine cord. Lamellar plates can be constructed from lacquered leather, horn, or even stone, though suits of iron and steel are the most common. Lamellar armor can be crafted into various shapes, including partial pieces such as breastplates, greaves, or even entire coats. The properties of specific suits and pieces of lamellar armor are determined by their material. This armor consists of a light breastplate and shoulder guards made from lacquered leather plates bound together and fitted over a silk shirt.",
    image: "/img/products/lamellar-cuirass.jfif",
    inStock: true,
    name: "Lamellar Cuirass",
    stock: 3
  }
];

const guestSeed = [];

const transactionSeed = [
  { quantity: 1, totalCost: 1 },
  { quantity: 1, totalCost: 1 },
  { quantity: 1, totalCost: 1 },
  { quantity: 1, totalCost: 1 }
];
const userSeed = [
  {
    firstName: "Larry",
    lastName: "Stooge",
    password: "test",
    class: "mage",
    email: "larry@acme.com"
  },
  {
    firstName: "Curly",
    lastName: "Stooge",
    password: "test",
    class: "rouge",
    email: "rouge@acme.com"
  },
  {
    firstName: "Betty",
    lastName: "Boop",
    password: "test",
    class: "warrior",
    email: "boop@acme.com"
  }
];
const seed = {
  cartSeed,
  guestSeed,
  // productSeed,
  // reviewSeed,
  transactionSeed,
  userSeed
};

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    await cartSeed.map(item => {
      Cart.create(item);
    });

    await transactionSeed.map(item => {
      Transaction.create(item);
    });
    // await userSeed.map(item => {
    //   User.create(item);
    // });

    // We need one more user whos id we can count on for login/cart information
    const fixedUser = await User.create({
      firstName: "Mr",
      lastName: "Immutable",
      password: "test",
      class: "mage",
      email: "test@test.test"
    });
    const fixedProduct = await Product.create({
      cost: 1,
      catagory: "armor",
      description: "Probably crap",
      inStock: true,
      name: "Bologna",
      stock: 99999
    });
    const fixedCart = await Cart.create({
      productId: fixedProduct.id,
      memberId: fixedUser.id,
      quantity: 10,
      memberStatus: "user"
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

    const [user1, user2, user3] = await Promise.all(
      userSeed.map(user => User.create({ ...user }))
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
