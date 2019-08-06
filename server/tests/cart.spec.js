const app = require("supertest")(require("../server"));
const { Cart, User, Product, db } = require("../db/index");

beforeAll(() => db.sync());

afterAll(() => db.sync());

describe("Cart knows who is a guest or user", async () => {
  const testProduct = await Product.create({ cost: 10,
					     catagory: 'armor',
					     description: 'A peice of junk',
					     inStock: true,
					     name: 'Poop',
					     stock: 10 });
  const testUser = await User.create({ isAdmin: false,
				       email: "jerk@butt.blah",
				       password: "testing"
				     });
  it("Allows a guest to add a product to the cart", () => {
    return app.get("/")
      .expect(200)
      .then( response => {
	expect(response.session).not.toBe(null);
      });
  });
});
