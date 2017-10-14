import bodyParser from 'body-parser'
import express from 'express'
import faker from 'faker'
import proxy from 'http-proxy-middleware'

const PORT = process.env.PORT || 3000
const LOGIN_API = process.env.LOGIN_API

let web = express()
web.all('*', logRequests)
web.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})

//-- Public Routes

web.get('/', function (req, res) {
  res.send('Hello World!')
})

web.get('/api/random/history', function (req, res) {
  res.send({
    fullname: faker.name.findName(),
    accountHistory: faker.helpers.createCard().accountHistory,
  })
})

// -- Proxies

web.use('/api/login', proxy({ target: LOGIN_API }))

// -- MUST load 'body-parser' after proxies

web.use(bodyParser.json({ limit: '50mb' }))
web.use(bodyParser.urlencoded({ extended: false }))

function logRequests (req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${req.method} ${req.path}`, req.body)
  }
  next()
}
