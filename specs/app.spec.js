// eslint-disable-next-line no-unused-vars
import { app } from '~/app';
import request from 'request';

const port = process.env.PORT || 3000;

describe ('app', () => {
  describe ('GET /', () => {
    it (`returns 'Hello World!`, (done) => {
      request.get(url('/'), (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('Hello World!');
        done();
      });
    });
  });

  describe ('GET /api/login', () => {
    context('API_LOGIN is not set', () => {
      it (`returns 504 status`, (done) => {
        request.get(url('/api/login'), (error, response, body) => {
          expect(response.statusCode).toBe(504);
          done();
        });
      });
    });

    context('API_LOGIN is set', () => {
      xit ('returns 200 status');
    });
  });
});

function url (path = '') {
  return `http://localhost:${port}` + path;
}
