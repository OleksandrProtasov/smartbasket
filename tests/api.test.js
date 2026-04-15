const request = require('supertest');
const app = require('../src/app');

describe('SmartBasket API', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('ok');
  });

  it('returns normalized products list from external API', async () => {
    const mockData = {
      products: [
        {
          id: 1,
          title: 'Phone',
          description: 'Demo phone',
          price: 100,
          rating: 4.5,
          thumbnail: 'https://example.com/thumb.jpg',
          images: ['https://example.com/1.jpg'],
          category: 'electronics',
          stock: 15,
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data[0]).toMatchObject({
      id: 'ext-1',
      title: 'Phone',
      source: 'external',
    });
  });
});
