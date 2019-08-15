const request = require('supertest');
const app = require('../server');
const { User, db } = require('../db/index');

beforeAll(() => db.sync());

describe('GET Users', () => {
  it('returns a full list of current members', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(1);
  });
});

describe('POST new user', () => {
  it('Adds a new user to the User table', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        firstName: 'Preston',
        lastName: 'the Valiant',
        email: 'Valiant@acme.com',
        password: 'test',
      });
    expect(response.status).toEqual(201);
    expect(response.body.id).not.toBe(undefined);
    expect(response.body.firstName).toBe('Preston');
    expect(response.body.email).toBe('Valiant@acme.com');
  });
});

describe('PUT a change to a user', () => {
  let preston;
  beforeAll(async () => {
    preston = await User.findOne({
      where: {
        firstName: 'Preston',
      },
    });
  });
  it('changes a property of a single user on the user table', async () => {
    const changePreston = await request(app)
      .put(`/api/users/${preston.id}`)
      .send({ lastName: 'the Brave' });
    const improvedPreston = await request(app).get(`/api/users/${preston.id}`);
    expect(changePreston.status).toEqual(200);
    expect(improvedPreston.body.lastName).toBe('the Brave');
  });
});

describe('DELETE a user', () => {
  let preston;
  beforeAll(async () => {
    preston = await User.findOne({
      where: {
        firstName: 'Preston',
      },
    });
  });
  it('Removes a user from the User table', async () => {
    const removedItem = await request(app).delete(`/api/users/${preston.id}`);
    const wherePreston = await request(app).get(`/api/users/${preston.id}`);
    expect(removedItem.status).toEqual(404);
    expect(wherePreston.body.firstName).toEqual(undefined);
  });
});

afterAll(() => db.close());
