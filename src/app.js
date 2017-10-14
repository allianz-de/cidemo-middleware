import bodyParser from 'body-parser'
import express from 'express'
import faker from 'faker'

let web = express()
const PORT = process.env.PORT || 3000

web.all('*', logRequests)

web.use(bodyParser.json({ limit: '50mb' }))
web.use(bodyParser.urlencoded({ extended: false }))

web.get('/', function (req, res) {
  res.send('Hello World!')
})

web.post('/api/login', function (req, res) {
  res.send({
    fullname: faker.name.findName()
  })
})

web.get('/api/random/history', function (req, res) {
  res.send({
    fullname: faker.name.findName(),
    accountHistory: faker.helpers.createCard().accountHistory,
  })
})

web.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})

function logRequests (req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${req.method} ${req.path}`, req.body)
  }
  next()
}