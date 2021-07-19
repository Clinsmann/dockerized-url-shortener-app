import request from 'supertest';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

import app from '../src/app';
import config from '../src/connection/connection';
import TinyURLEntity from '../src/entities/TinyURLEntity';
const googleLink = 'https://google.com';

describe('GET / - a simple api endpoint', () => {
  let connection: Connection, encodedLink: string, fullLink: string;
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
      .getRepository(TinyURLEntity)
      .delete({ tiny_url: fullLink })
      .then(() => {
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
  });

  it('test if the app is up and running', async () => {
    const result = await request(app).get('/');
    expect(result.body.message).toEqual('application up and running...');
    expect(result.statusCode).toEqual(200);
  });

  it('positive::Should encode a url and return the shortened version', async () => {
    const res = await request(app).get(`/encode?url=${googleLink}`);
    fullLink = res.body.shortLink;
    encodedLink = fullLink.replace('http://127.0.0.1/', '');
    expect(res.body.shortLink).toContain('http://127.0.0.1/');
    expect(res.statusCode).toEqual(200);
  });

  it('positive::decode a url and return the main version', async () => {
    const res = await request(app).get(`/decode/${encodedLink}`);
    expect(res.body.mainLink).toEqual(googleLink);
    expect(res.statusCode).toEqual(200);
  });

  it('positive::should redirect when the shortened link is visited', async () => {
    const res = await request(app).get(`/${encodedLink}`);
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual(googleLink);
  });

  it('positive::should increase counter for number of clicks', async () => {
    const res = await request(app).get(`/statistics/${encodedLink}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.clicks).toEqual(2);
  });

  it('positive::should increase counter for number of clicks + 1', async () => {
    await request(app).get(`/${encodedLink}`);
    const res = await request(app).get(`/statistics/${encodedLink}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.clicks).toEqual(3);
  });
});
