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
//vvvv Easier to access the info later on vvv
const testUser = async () => {
  let user = await User.findOne({ where: { email: 'test@test.com' } });
  return user;
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
  it('appropriately sets req.session.userId', async () => {
    const response = await request(app)
      .post('/api/login/login')
      .send({ email:'test@test.com', password:'test'});
      expect(request.session.userId).toEqual(testUser.id)
  })
});

destroyTestUser();

afterAll(() => db.close());
