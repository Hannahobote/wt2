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
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))*/

app.get('/', function (req, res) {
  console.log(process.env.CORS_URL)
  res.set('Access-Control-Allow-Origin', process.env.CORS_URL);
  res.send(elasticResult)
})


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
})