import request from 'supertest';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

import app from '../src/app';
import config from '../src/connection/connection';
const googleLink = 'https://google.com';

describe('GET / - a simple api endpoint', () => {
  let connection: Connection, encodedLink: string;
  beforeAll((done) => {
    createConnection(config)
      .then((newConnection) => {
        connection = newConnection;
        done();
      })
      .catch((err) => {
        console.log('Unable to connect to db', err);
        process.exit(1);
      });
  });

  afterAll((done) => {
    connection
      .close()
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log('Unable to close connect to db', err);
        process.exit(1);
      });
  });

  it('test if the app is up and running', async () => {
    const result = await request(app).get('/');
    expect(result.body.message).toEqual('application up and running...');
    expect(result.statusCode).toEqual(200);
  });

  it('test the encode endpoint', async () => {
    const res = await request(app).get(`/encode?url=${googleLink}`);
    encodedLink = res.body.shortLink;
    encodedLink = encodedLink.replace('http://127.0.0.1/', '');
    // console.log({ encodedLink, test1: res.body.shortLink });
    expect(res.body.shortLink).toContain('http://127.0.0.1/');

    expect(res.statusCode).toEqual(200);
  });

  it('test the encode endpoint', async () => {
    const res = await request(app).get(`/decode/${encodedLink}`);
    // console.log({ res: res.body, encodedLink });
    expect(res.body.mainLink).toEqual(googleLink);
    expect(res.statusCode).toEqual(200);
  });
});
