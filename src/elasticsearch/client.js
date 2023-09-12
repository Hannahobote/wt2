import { Client } from '@elastic/elasticsearch'
import dotenv from 'dotenv'

// Connect .env file
dotenv.config()

// create an elasit search client and connect it elastic cloud through basic auhentication
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

// Searches for the top 10 scored animes in the index, and only returns the english name, japanese name, score and plan to watch
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
              "_source": ["English name", "Japanese name", "Score", "Plan to Watch"]
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

      // Push the result to my own array. Transform the result to better workable data,
      elasticResult.push(doc.top_matching_docs.hits.hits)
    });
  })
  .catch(err => console.log(err.message))

  elasticResult = elasticResult.flat()


// Start elastic search client
client.ping()
  .then(res => console.log("You are connected to elastic search", res))
  .catch(error => console.log('Elasticsearch is not connected', error))


export default {client, elasticResult}