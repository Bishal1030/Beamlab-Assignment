const request = require('supertest');
const products = require('../fixtures/products.json'); 
const user = require('../fixtures/users.json');

const baseUrl = 'http://localhost:3003';

describe('Order Route Testing', () => {
  let validToken;
  let adminValidToken;

  beforeAll(async () => {
    // Performing login request and retrieving token for a non-admin user
    const loginResponse = await request(baseUrl)
      .post('/api/v1/user/login')
      .send({ email: user.users[0].email, password: user.users[0].password });
    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.data).toHaveProperty('token');
    validToken = loginResponse.body.data.token; // Extracting the valid token

    // Admin login request and retrieving token
    const adminLoginResponse = await request(baseUrl)
      .post('/api/v1/admin/login')
      .send({ email: user.users[1].email, password: user.users[1].password });
    expect(adminLoginResponse.statusCode).toBe(200);
    expect(adminLoginResponse.body.data).toHaveProperty('token');
    adminValidToken = adminLoginResponse.body.data.token; // Extract the admin token

    // Seed the database with products
    for (const product of products) {
      await request(baseUrl)
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${validToken}`)
        .send(product);
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create order successfully', async () => {
    const product = products[2]; // Using the product directly from products.json
    const newOrder = { 
      quantity: 2, 
      productId: product.id
    };

    const response = await request(baseUrl)
      .post(`/api/v1/orders/${product.id}`)
      .set('Authorization', `Bearer ${validToken}`)
      .send(newOrder);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Order created');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject({
      quantity: 2,
      productId: product.id,
    });
  });

  test("only admin should get all the orders", async () => {
    const response = await request(baseUrl)
      .get('/api/v1/orders')
      .set("authorization", `Bearer ${adminValidToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', "All Orders :");
    expect(response.body).toHaveProperty('data');
  });

  test("should delete the order", async() => {
    const response = await request(baseUrl)
    .delete('/api/v1/orders/:id')
    .set("authorization", `Bearer ${adminValidToken}`)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('message', "product deleted")
  })
});
