const request = require('supertest');
const app = require('../server');
const { Review, db } = require('../db/index');

beforeAll(() => db.sync());

describe('GET and POST review routes', () => {
  it('gets all the current reviews', async () => {
    const response = await request(app).get('/api/reviews');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(1);
  });

  it('can post a new review', async () => {
    const response = await request(app)
      .post('/api/reviews')
      .send({
        title: 'Betty knows best',
        body:
          'Donec magna ex, iaculis ut augue sed, aliquet aliquam tellus. Mauris dolor lectus, venenatis non ultrices ut, cursus non diam. ',
      });
    expect(response.status).toEqual(201);
    expect(response.body.title).toBe('Betty knows best');
  });
});

describe('Delete and PUT review routes', () => {
  let bettyReview;

  beforeAll(async () => {
    bettyReview = await Review.findOne({
      where: {
        title: 'Betty knows best',
      },
    });
  });

  it("changes the title of Betty's article", async () => {
    const response = await request(app)
      .put(`/api/reviews/${bettyReview.id}`)
      .send({ title: "Where's Preston?" });
    expect(response.status).toEqual(201);
    expect(response.body.title).toEqual("Where's Preston?");
  });

  it('Removes the article based on the id', async () => {
    const removedArticle = await request(app).delete(
      `/api/reviews/${bettyReview.id}`,
    );
    const noArticle = await request(app).get(`/api/reviews/${bettyReview.id}`);
    expect(removedArticle.status).toEqual(204);
    expect(noArticle.body.name).toEqual(undefined);
  });
});

afterAll(() => db.close());
