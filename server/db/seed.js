const db = require('./db');
const { Cart, Guest, Product, Transaction, User } = require('./index')

syncAndSeed = async() => {
  await db.sync({force:true})
  await cartSeed.map((item) => {
    Cart.create(item)
  })
  await guestSeed.map((item) => {
    Guest.create(item)
  })
  await productSeed.map((item) => {
    Product.create(item)
  })
  await transactionSeed.map((item) => {
    Transaction.create(item)
  })
  await userSeed.map((item) => {
    User.create(item)
  })
};
//SEEDS
const cartSeed = [];
const guestSeed = [];
const productSeed = [
  {cost:20, description:'The armored kilt is made of a thick cloth skirt with bars of steel hanging down from the waist and a ring of horizontal steel plates just above the hem. An armored kilt can be worn separately as light armor, or it can be added to other suits of light or medium armor.', image:'./public/img/products/armored-kilt.jpg', inStock:true, name:'Armored Kilt', stock:12},
  {cost:3, description:'Also called a belly-warmer, a haramaki is a simple silken sash lined with chainmail or articulated metal plates and tied about the stomach to protect it.', image:'./public/img/products/Haramaki.jpeg', inStock:true, name:'Haramaki', stock:13},
  {cost:3, description:'More than simple clothing, padded armor combines heavy, quilted cloth and layers of densely packed stuffing to create a cheap and basic protection. It is typically worn by those not intending to face lethal combat or those who wish their maneuverability to be impacted as little as possible.', image:'./public/img/products/Light-Armour.png', inStock: true, name:'Light Armor', stock:14},
  {cost:1, description:'Sometimes called a leine, this belted tunic has thick cords woven through it that cover vital areas. A reinforced tunic’s armor bonus is increased by 2 against attack rolls made to confirm critical hits against the wearer.', image:'./public/img/products/Tunic.jpg', inStock:false, name:'Reinforced Tunic', stock:0},
  {cost:15, description:'Lamellar is a type of armor in which small plates of various types of materials are strung together in parallel rows using fine cord. Lamellar plates can be constructed from lacquered leather, horn, or even stone, though suits of iron and steel are the most common. Lamellar armor can be crafted into various shapes, including partial pieces such as breastplates, greaves, or even entire coats. The properties of specific suits and pieces of lamellar armor are determined by their material. This armor consists of a light breastplate and shoulder guards made from lacquered leather plates bound together and fitted over a silk shirt.', image:'./public/img/products/lamellar-cuirass.jpeg', inStock:true, name:'Lamellar Cuirass', stock:3}
];
const transactionSeed = [];
const userSeed = [
  {name:'Thome'},
  {name:'Schuyler'},
  {name:'Nick'},
  {name:'Same', class:'mage'}
];
const seed = {
  productSeed,
  userSeed,
};
//EXPORT
module.export = {
  syncAndSeed,
  seed
}
