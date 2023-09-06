import express from 'express'
import dotenv from 'dotenv'
import client from './elasticsearch/client.js'

dotenv.config()
const app = express()


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
})