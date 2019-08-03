const request = require("supertest");
const app = require("../server");
const { syncAndSeed } = require("../db/seed.js");

// beforeAll(() => syncAndSeed());
// syncAndSeed();

//just to see if JEST IS RUNNING
describe("User route API endpoints", () => {
  it("Has a working test", () => {
    expect(true).toEqual(true);
  });
});

describe("GET Users", () => {
  it("returns a full list of current members", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(1);
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
