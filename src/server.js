import express from 'express'
import dotenv from 'dotenv'
import {elasticResult} from './elasticsearch/client.js'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

dotenv.config()

//connect to express sever
const app = express()

// Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
app.use(helmet());

// log http req
app.use(logger('dev'))

// Parse requests of the content type application/json.
app.use(express.json())

// enable cors options
// app.use(cors())

/*var whitelist = ['http://localhost:3000', 'https://wt2-viz.vercel.app']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}*/
 


// Main route to get elastic results 
app.options('/', cors()) // enable pre-flight request for DELETE request
app.get('/', cors(), function (req, res) {
  res.send(elasticResult)
})

// Starts the HTTP server listening for connections.
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
})