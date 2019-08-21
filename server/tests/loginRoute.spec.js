const request = require('supertest');
const app = require('../server');
const { User, db } = require('../db/index');

beforeAll(() => db.sync());

const createTestUser = async () => {
  await User.create({
    firstName:'iAmTest',
    lastName: 'testIAm',
    class: 'warrior',
    email:'test@test.com',
    password:'test'
  });
};
const destroyTestUser = async () => {
  await User.destroy({
    where: {email: 'test@test.com'}
  });
};

createTestUser();

describe('POST login route', () => {
  it('returned relevant user info to client', async () => {
    const response = await request(app)
      .post('/api/login/login')
      .send({ email:'test@test.com', password:'test' });
    expect(response.status).toEqual(202);
    expect(response.body.firstName).toEqual('iAmTest');
    expect(response.body.isAdmin).toEqual(false);
  });
});

destroyTestUser();

afterAll(() => db.close());
