import { test, expect } from '../fixtures/auth.fixture';
import { newItem } from '../fixtures/testData';

test.describe('Items API', () => {
  let createdId: string;

  test('GET /items (empty or list)', async ({ request, authToken, baseURL }) => {
    const res = await request.get(`${process.env.API_URL || baseURL}/api/items`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('POST /items', async ({ request, authToken, baseURL }) => {
    const item = newItem();
    const res = await request.post(`${process.env.API_URL || baseURL}/api/items`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: item
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.title).toBe(item.title);
    createdId = body.id;
  });

  test('PUT /items/:id', async ({ request, authToken, baseURL }) => {
    const res = await request.put(`${process.env.API_URL || baseURL}/api/items/${createdId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { title: 'Updated Title' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe('Updated Title');
  });

  test('DELETE /items/:id', async ({ request, authToken, baseURL }) => {
    const res = await request.delete(`${process.env.API_URL || baseURL}/api/items/${createdId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(204);
  });

  test('negative: DELETE /items/:id with wrong id', async ({ request, authToken, baseURL }) => {
    const res = await request.delete(`${process.env.API_URL || baseURL}/api/items/does-not-exist`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(404);
  });
});
