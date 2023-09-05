import {Client} from '@elastic/elasticsearch'
import dotenv from 'dotenv'

dotenv.config()

export const myClient = new Client({
  cloud: {
    id: process.env.CLOUD_ID
  },
  auth:{
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD 
    //apiKey: process.env.API_KEY
  },
})


myClient.ping()
  .then(res => console.log("You are connected to elastic search", res))
  .catch(error => console.log('Elasticsearch is not connected', error))


export default myClient