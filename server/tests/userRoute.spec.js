const request = require("supertest");
const app = require("../server");
const { User, Product } = require("../db/index");

describe("GET Users", () => {
  it("returns a full list of current members", async done => {
    const response = await request(app).get("/api/users");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(1);
    done();
  });
});

describe("POST new user", () => {
  it("Adds a new user to the User table", async done => {
    const response = await request(app)
      .post("/api/users")
      .send({
        firstName: "Preston",
        lastName: "the Valiant",
        email: "Valiant@acme.com"
      });
    expect(response.status).toEqual(201);
    expect(response.body.id).not.toBe(undefined);
    expect(response.body.firstName).toBe("Preston");
    expect(response.body.email).toBe("Valiant@acme.com");
    done();
  });
});

describe("PUT a change to a user", () => {
  let preston;
  beforeAll(async () => {
    preston = await User.findOne({
      where: {
        firstName: "Preston"
      }
    });
  });
  it("changes a property of a single user on the user table", async done => {
    const changePreston = await request(app)
      .put(`/api/users/${preston.id}`)
      .send({ lastName: "the Brave" });
    const improvedPreston = await request(app).get(`/api/users/${preston.id}`);
    expect(changePreston.status).toEqual(204);
    expect(improvedPreston.body.lastName).toBe("the Brave");
    done();
  });
});

describe("DELETE a user", () => {
  let preston;
  beforeAll(async () => {
    preston = await User.findOne({
      where: {
        firstName: "Preston"
      }
    });
  });
  it("Removes a user from the User table", async done => {
    const removedItem = await request(app).delete(`/api/users/${preston.id}`);
    const wherePreston = await request(app).get(`/api/users/${preston.id}`);
    expect(removedItem.status).toEqual(404);
    expect(wherePreston.body.firstName).toEqual(undefined);
    done();
  });
});

/*-----------products tests----------------*/

describe("/GET /api/products", () => {
  it("serves up all products", async done => {
    const response = await request(app).get("/api/products");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(1);
    done();
  });
});
describe("/POST", () => {
  it("Adds a product to the products list", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({ name: "Potion" });
    expect(response.status).toEqual(201);
    expect(response.body.id).not.toBe(undefined);
    expect(response.body.name).toBe("Potion");
  });
});
describe("PUT and DELETE /api/products/:id", () => {
  let item;
  beforeAll(async () => {
    item = await Product.findOne({
      where: {
        name: "Potion"
      }
    });
  });

  it("put a product by `id`", async () => {
    const changeProduct = await request(app)
      .put(`/api/products/${item.id}`)
      .send({ name: "Staff" });
    expect(changeProduct.status).toEqual(200);
  });

  it("DELETE a product from the products list", async done => {
    const removedItem = await request(app).delete(`/api/products/${item.id}`);
    const noStaff = await request(app).get(`/api/products/${item.id}`);
    expect(removedItem.status).toEqual(204);
    expect(noStaff.body.name).toEqual(undefined);
    done();
  });
});
