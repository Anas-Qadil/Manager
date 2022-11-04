import request from 'supertest';
import server from '../../../server';

// POST: /api/v1/auth/sign-up
describe('test sign-up using invalid data', () => {
  test('it should return 400', async () => {
    // speciel characters variable
    const characters = '`!#$%^&*()[+\-=\[\]{};\':"\\|],<>\/?~';

    // generate random string\
    const generateString = (length: number): string => {
      let result = ' ';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return (result);
    };

    const generateNumber = (min: number, max: number): number => {
      return (Math.floor(Math.random() * (max - min + 1) + min));
    };

    const length = generateNumber(1, 55);
    const username = generateString(length);
    const password = generateString(length);
    const matricule = generateString(length);

    const response = await request(server)
      .post('/api/v1/auth/sign-up')
      .set('Content-Type', 'application/json')
      .set('authorization', 'Bearer ' + process.env.JWT_TOKEN)
      .send({ username, password, matricule });
    expect(response.statusCode).toBe(400);
  });
});

// POST: /api/v1/auth/sign-up
describe('test sign-up using undefined data', () => {
  test('it should return 400', async () => {
    const username = undefined;
    const password = undefined;
    const matricule = undefined;

    const response = await request(server)
      .post('/api/v1/auth/sign-up')
      .set('Content-Type', 'application/json')
      .set('authorization', 'Bearer ' + process.env.JWT_TOKEN)
      .send({ username, password, matricule });
    expect(response.statusCode).toBe(400);
  });
});

// POST: /api/v1/auth/sign-up
describe('test sign-up using no', () => {
  test('it should return 400', async () => {
    const response = await request(server)
      .post('/api/v1/auth/sign-up')
      .set('Content-Type', 'application/json')
      .set('authorization', 'Bearer ' + process.env.JWT_TOKEN)
      .send();
    expect(response.statusCode).toBe(400);
  });
});