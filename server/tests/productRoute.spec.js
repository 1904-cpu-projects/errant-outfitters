const request = require('supertest');
const app = require('../server');
const { Product, db } = require('../db/index');

beforeAll(() => db.sync());

/*-----------products tests----------------*/

describe('/GET /api/products', () => {
  it('serves up all products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(1);
  });
});
describe('/POST', () => {
  it('Adds a product to the products list', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ name: 'CRAZY TRAIN' });
    expect(response.status).toEqual(201);
    expect(response.body.id).not.toBe(undefined);
    expect(response.body.name).toBe('CRAZY TRAIN');
  });
});
describe('PUT and DELETE /api/products/:id', () => {
  let item;
  beforeAll(async () => {
    item = await Product.findOne({
      where: {
        name: 'CRAZY TRAIN',
      },
    });
  });

  it('put a product by `id`', async () => {
    const changeProduct = await request(app)
      .put(`/api/products/${item.id}`)
      .send({ name: 'CRAZY CAT' });
    expect(changeProduct.status).toEqual(200);
  });

  it('DELETE a product from the products list', async () => {
    const removedItem = await request(app).delete(`/api/products/${item.id}`);
    const noStaff = await request(app).get(`/api/products/${item.id}`);
    expect(removedItem.status).toEqual(204);
    expect(noStaff.body.name).toEqual(undefined);
  });
});

afterAll(() => db.close());
