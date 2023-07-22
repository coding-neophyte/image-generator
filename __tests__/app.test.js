const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const agent = request.agent(app);

const fakeUser = {
  name: 'justaname',
  usernam: 'username1',
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

  });
});
