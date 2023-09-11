import express from 'express'
import dotenv from 'dotenv'
import {client, elasticResult} from './elasticsearch/client.js'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(helmet());

app.use(logger('dev'))

app.use(express.json())

app.use(cors({ origin: ['http://localhost:3000', 'https://wt2-viz.vercel.app/'] }))

app.get('/', function (req, res) {
  res.send(elasticResult)
})


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
})