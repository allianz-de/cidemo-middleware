import bodyParser from 'body-parser';
import express from 'express';
import proxy from 'http-proxy-middleware';

const PORT = process.env.PORT || 3000;
const LOGIN_API = process.env.LOGIN_API || 'http://placeholder/';

let web = express();
web.all('*', logRequests);
web.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// -- Public Routes

web.get('/', function (req, res) {
  res.send('Hello World!');
});

// -- Proxies

web.use('/api/login', proxy({ target: LOGIN_API }));

// -- MUST load 'body-parser' after proxies

web.use(bodyParser.json({ limit: '50mb' }));
web.use(bodyParser.urlencoded({ extended: false }));

function logRequests (req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    let body = req.body || '';
    console.log(`${req.method} ${req.path}`, body);
  }
  next();
}
