import express from 'express'
import dotenv from 'dotenv'
import {elasticResult} from './elasticsearch/client.js'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(helmet());

app.use(logger('dev'))

app.use(express.json())

/*const corsOptions = {
  origin: process.env.CORS_URL
}
app.use((corsOptions))*/

app.get('/', function (req, res) {
  res.header('Access-Control-Allow-Credentials', true)
  res.send(elasticResult)
})


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
})