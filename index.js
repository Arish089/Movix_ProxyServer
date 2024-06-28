const express = require('express')
const app = express()
require('dotenv').config()
const axios = require('axios')
const cors = require('cors')

const port = process.env.PORT
console.log(port);
app.use(express.json())
app.use(cors())
//console.log(process.env.API_KEY);
const baseurl = 'https://api.themoviedb.org/3'

app.get('/api/data',async (req,res)=>{
  const {url} = req.query
        try {
          const resp = await axios({
            method:'get',
            baseURL: baseurl,
            url: url,
            headers:{
              'accept': 'application/json',
              'Authorization':
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWVlY2FjNTNkMWY2NWZlYzJlZmM5MTRhMThmMjYxMiIsInN1YiI6IjY1OWFmODA5MGQxMWYyMDIwMmViMjIyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VvH2aM_CCdil6AAuu-KU_0CEReTlj7W8y7Mm7G2EaYQ' 
            }
          })
          res.status(200).send(resp.data)
        } catch (error) {
          res.status(error.response ? error.response.status: 500).send(error.message)
        }
      }
)

app.get('/api/:endpoint',async (req,res)=>{
  const {endpoint} = req.params
  const query = req.query;  // Extract the query parameters
  const queryString = new URLSearchParams(query).toString();
        try {
          const resp = await axios({
            method:'get',
            baseURL:`https://api.themoviedb.org/3`,
            url:`/movie/${endpoint}?${queryString}`,
            headers:{
              'accept': 'application/json',
              'Authorization':`${process.env.API_KEY}` 
            }
          })
          res.status(200).send(resp.data)
        } catch (error) {
          res.status(error.response ? error.response.status: 500).send(error.message)
        }
      }
)
app.listen(port,()=>{
console.log('Server is running',port);
})