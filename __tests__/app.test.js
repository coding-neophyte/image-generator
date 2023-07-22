const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const agent = request.agent(app);

const fakeUser = {
  name: 'justaname',
  username: 'username1',
  email: 'weeks@mail.com',
  password: 'fakeword'
};

describe('Testing User Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Sign Up Test', async () => {
    const response = await agent.post('/auth/register').send(fakeUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(fakeUser.email);
    expect(response.body.name).toBe(fakeUser.name);
    expect(response.body.username).toBe(fakeUser.username);
  });
  it('Sign In Test', async () => {
    const newUser = await agent.post('/auth/register').send(fakeUser);
    const response = await agent.post('/auth/signin').send({
      email: newUser.body.email,
      password: fakeUser.password
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Signed In' });
  });
});
