import { Client } from '@elastic/elasticsearch'
import dotenv from 'dotenv'

dotenv.config()

export const client = new Client({
  cloud: {
    id: process.env.CLOUD_ID
  },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD
    //apiKey: process.env.API_KEY
  },
})

export let elasticResult = []

await client.search({
  index: 'anime_recs',
  body: {
    size: 0,
    aggs: {
      "top_10_scored_anime_avg": {
        "terms": {
          "field": "Score", "exclude": "Unknown",
          "order": {
            "_key": "desc"
          }
        },
        aggs: {
          "top_matching_docs": {
            "top_hits": {
              "size": 10,
              "_source": ["English name", "Japanese name", "Score"]
            }
          }
        }
      }
    }
  }
})
  .then(res => {
    res.aggregations.top_10_scored_anime_avg.buckets.forEach(doc => {
      //console.log(doc.top_matching_docs.hits.hits.flat())
      elasticResult.push(doc.top_matching_docs.hits.hits)
    });
  })
  .catch(err => console.log(err.message))
elasticResult = elasticResult.flat()



client.ping()
  .then(res => console.log("You are connected to elastic search", res))
  .catch(error => console.log('Elasticsearch is not connected', error))


export default {client, elasticResult}