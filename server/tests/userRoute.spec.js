const request = require("supertest");
const app = require("../server");

describe("GET Users", () => {
  it("returns a full list of current members", async done => {
    const response = await request(app).get("/api/users");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(1);
    done();
  });
});

describe("POST new user", () => {
  it("Adds a new user to the User table", async () => {
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
  });
});

describe("PUT a change to a user", () => {
  it("changes a property of a single user on the user table", async () => {
    const getUsers = await request(app).get("/api/users");

    const changeUser = await request(app)
      .put(`/api/users/${getUsers.body[getUsers.body.length - 1].id}`)
      .send({ lastName: "the Brave" });

    const modifiedUser = await request(app).get(
      `/api/users/${getUsers.body[getUsers.body.length - 1].id}`
    );

    expect(changeUser.status).toEqual(204);
    expect(modifiedUser.body.lastName).toBe("the Brave");
  });
});

describe("DELETE a user", () => {
  it("Removes a user from the User table", async () => {
    const getPreDelete = await request(app).get("/api/users");
    const removedItem = await request(app).delete(
      `/api/users/${getPreDelete.body[0].id}`
    );
    const getPostDelete = await request(app).get("/api/users");
    expect(removedItem.status).toEqual(404);
    expect(getPreDelete.body.length).not.toEqual(getPostDelete.body.length);
  });
});
