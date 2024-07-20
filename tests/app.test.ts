import request from 'supertest';
import app from '../src/app';

describe('POST /recommend', () => {
  it('should return recommendations for a valid image', async () => {
    const response = await request(app)
      .post('/recommend')
      .send({ image: 'base64imagestring' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('recommendations');
  });

  it('should return 400 for missing image', async () => {
    const response = await request(app).post('/recommend').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Image data is required');
  });
});
