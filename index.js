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
              `Bearer ${process.env.API_KEY}` 
            }
          })
          res.status(200).send(resp.data)
        } catch (error) {
          res.status(error.response ? error.response.status: 500).send(error.message)
        }
      }
)

app.get('/api/:id',async (req,res)=>{
  const {id} = req.params
  const query = req.query;  // Extract the query parameters
  console.log(query);
  const queryString = new URLSearchParams(query).toString();
  
        try {
          const [resp1,resp2] = await Promise.all([
             axios({
            method:'get',
            baseURL:`https://api.themoviedb.org/3`,
            url:`/movie/${id}?language=en-US&append_to_response=videos`,
            headers:{
              'accept': 'application/json',
              'Authorization':`Bearer ${process.env.API_KEY}` 
            }
          }),
          axios({
            method:'get',
            baseURL:`https://api.themoviedb.org/3`,
            url:`/movie/${id}/credits?language=en-US&append_to_response=videos`,
            headers:{
              'accept': 'application/json',
              'Authorization':`Bearer ${process.env.API_KEY}` 
            } 
          })])
          res.status(200).send({
            resp1:resp1,
            resp2:resp2})
        } catch (error) {
          res.status(error.response ? error.response.status: 500).send(error.message)
        }
      }
)
app.listen(port,()=>{
console.log('Server is running',port);
})

//Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWVlY2FjNTNkMWY2NWZlYzJlZmM5MTRhMThmMjYxMiIsInN1YiI6IjY1OWFmODA5MGQxMWYyMDIwMmViMjIyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VvH2aM_CCdil6AAuu-KU_0CEReTlj7W8y7Mm7G2EaYQ