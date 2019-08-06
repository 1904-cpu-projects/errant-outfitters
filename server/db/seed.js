const {
  db,
  Cart,
  Guest,
  Product,
  Review,
  Transaction,
  User
} = require("./index");

const syncAndSeed = async () => {
  await db.sync({ force: true });
  await cartSeed.map(item => {
    Cart.create(item);
  });
  await guestSeed.map(item => {
    Guest.create(item);
  });
  await productSeed.map(item => {
    Product.create(item);
  });
  await reviewSeed.map(item => {
    Review.create(item);
  });
  await transactionSeed.map(item => {
    Transaction.create(item);
  });
  await userSeed.map(item => {
    User.create(item);
  });
};
//SEEDS
const cartSeed = [
  { memberStatus: "member", quantity: 2 },
  { memberStatus: "member", quantity: 1 },
  { memberStatus: "member", quantity: 4 },
  { memberStatus: "member", quantity: 100 },
  { memberStatus: "guest", quantity: 2 }
];
const guestSeed = [];
const productSeed = [
  {
    cost: 20,
    description:
      "The armored kilt is made of a thick cloth skirt with bars of steel hanging down from the waist and a ring of horizontal steel plates just above the hem. An armored kilt can be worn separately as light armor, or it can be added to other suits of light or medium armor.",
    image: "./img/products/armored-kilt.jpg",
    inStock: true,
    name: "Armored Kilt",
    stock: 12
  },
  {
    cost: 3,
    description:
      "Also called a belly-warmer, a haramaki is a simple silken sash lined with chainmail or articulated metal plates and tied about the stomach to protect it.",
    image: "./img/products/Haramaki.jpg",
    inStock: true,
    name: "Haramaki",
    stock: 13
  },
  {
    cost: 3,
    description:
      "More than simple clothing, padded armor combines heavy, quilted cloth and layers of densely packed stuffing to create a cheap and basic protection. It is typically worn by those not intending to face lethal combat or those who wish their maneuverability to be impacted as little as possible.",
    image: "./img/products/Light-Armor.png",
    inStock: true,
    name: "Light Armor",
    stock: 14
  },
  {
    cost: 1,
    description:
      "Sometimes called a leine, this belted tunic has thick cords woven through it that cover vital areas. A reinforced tunic’s armor bonus is increased by 2 against attack rolls made to confirm critical hits against the wearer.",
    image: "./img/products/Tunic.jpg",
    inStock: false,
    name: "Reinforced Tunic",
    stock: 0
  },
  {
    cost: 15,
    description:
      "Lamellar is a type of armor in which small plates of various types of materials are strung together in parallel rows using fine cord. Lamellar plates can be constructed from lacquered leather, horn, or even stone, though suits of iron and steel are the most common. Lamellar armor can be crafted into various shapes, including partial pieces such as breastplates, greaves, or even entire coats. The properties of specific suits and pieces of lamellar armor are determined by their material. This armor consists of a light breastplate and shoulder guards made from lacquered leather plates bound together and fitted over a silk shirt.",
    image: "./img/products/lamellar-cuirass.jfif",
    inStock: true,
    name: "Lamellar Cuirass",
    stock: 3
  }
];
const reviewSeed = [
  {
    title: "Cras non efficitur ipsum",
    author: "Moe",
    body:
      "Donec magna ex, iaculis ut augue sed, aliquet aliquam tellus. Mauris dolor lectus, venenatis non ultrices ut, cursus non diam. Proin sagittis, ligula a mollis mollis, ipsum felis consectetur libero, nec pharetra odio arcu eu mauris. Pellentesque mi nibh, interdum non porttitor sit amet, hendrerit in nisl."
  },
  {
    title: "Duis tempor porttitor metus",
    author: "Larry",
    body:
      "Aenean quis purus augue. Duis massa ipsum, ultrices vitae augue eget, tristique ultrices turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius nisl orci, sit amet vehicula nulla porta nec. Nunc commodo varius nibh. Sed id ornare purus. Etiam eros urna, gravida sed orci vel, efficitur suscipit turpis. Nulla nec sapien placerat, imperdiet eros a, malesuada augue."
  },
  {
    title: "Aenean quis purus augue",
    author: "Curly",
    body:
      "Sed nec pharetra sem. Duis bibendum quis est ut blandit. Suspendisse dignissim, elit ut sodales imperdiet, ligula orci finibus odio, in consequat magna enim facilisis ante. Suspendisse tempor nunc odio, quis consectetur eros tincidunt quis. Proin sollicitudin sapien eget eros commodo, id aliquam erat blandit. Aenean molestie diam quam, vel volutpat metus lacinia a. Nunc id pretium tortor. Ut nec neque facilisis, laoreet lectus sed, pretium lorem. "
  }
];
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
  productSeed,
  reviewSeed,
  transactionSeed,
  userSeed
};

syncAndSeed();

//EXPORT
module.exports = {
  syncAndSeed,
  seed
};
