const request = require('supertest');
const app = require('../src/app');
const setup = require('./setupTestEnv');
const User = require('../src/models/User');

beforeAll(async () => {
  await setup.start();
});

afterAll(async () => {
  await setup.stop();
});

afterEach(async () => {
  await setup.clear();
});

describe('Auth endpoints', () => {
  test('register should create a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'alice', email: 'alice@example.com', password: 'Secret123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');

    const dbUser = await User.findOne({ email: 'alice@example.com' });
    expect(dbUser).not.toBeNull();
    expect(dbUser.username).toBe('alice');
  });

  test('login should return a token', async () => {
    // create a user
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'bob', email: 'bob@example.com', password: 'Secret123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'bob@example.com', password: 'Secret123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('protected route should return user info with valid token', async () => {
    // register and login
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'carol', email: 'carol@example.com', password: 'Secret123' });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'carol@example.com', password: 'Secret123' });

    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/user/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', 'carol@example.com');
    expect(res.body).toHaveProperty('username', 'carol');
  });
});
