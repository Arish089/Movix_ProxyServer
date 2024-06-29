const express = require('express')
const app = express()
require('dotenv').config()
const axios = require('axios')
const cors = require('cors')

const port = process.env.PORT
//console.log(port);
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

app.get('/api/movie/:id',async (req,res)=>{
  const {id} = req.params
  //console.log(id);
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
          })
        ])
        console.log(resp1,resp1.data);
          res.status(200).send({
            movie:resp1.data,
            credits:resp2.data})
        } catch (error) {
          console.error('error fetching movie data',error.message)
          res.status(error.response ? error.response.status: 500).send({
            message: error.message,
      status: error.response ? error.response.status : 500
          })
        }
      }
)

app.get('/api/tv/:id',async (req,res)=>{
  const {id} = req.params
  //console.log(id);
        try {
          const [resp1,resp2] = await Promise.all([
             axios({
            method:'get',
            baseURL:`https://api.themoviedb.org/3`,
            url:`/tv/${id}?language=en-US`,
            headers:{
              'accept': 'application/json',
              'Authorization':`Bearer ${process.env.API_KEY}` 
            }
          }),
          axios({
            method:'get',
            baseURL:`https://api.themoviedb.org/3`,
            url:`/tv/${id}/credits?language=en-US&append_to_response=videos`,
            headers:{
              'accept': 'application/json',
              'Authorization':`Bearer ${process.env.API_KEY}` 
            } 
          })
        ])
        //console.log(resp1,resp1.data);
          res.status(200).send({
            tv:resp1.data,
            credits:resp2.data})
        } catch (error) {
          console.error('error fetching movie data',error.message)
          res.status(error.response ? error.response.status: 500).send({
            message: error.message,
      status: error.response ? error.response.status : 500
          })
        }
      }
)

app.get('/api/search/:searchquery', async (req, res)=>{
  const {searchquery} = req.params
  const {page,filter} = req.query
  console.log(page,searchquery);
try {
  let resp = await axios({
    method:'get',
    baseURL: `https://api.themoviedb.org/3`,
    url:`/search/${filter}?&include_adult=false&language=en-US&page=${page}&query=${searchquery}`,
    headers:{
      'accept': 'application/json',
      'Authorization':`Bearer ${process.env.API_KEY}` 
    }
  })
  res.status(200).send(resp.data)
} catch (error) {
  res.status(error.response ? error.response.status: 500).send(error)
}
})


app.listen(port,()=>{
console.log('Server is running',port);
})

//Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWVlY2FjNTNkMWY2NWZlYzJlZmM5MTRhMThmMjYxMiIsInN1YiI6IjY1OWFmODA5MGQxMWYyMDIwMmViMjIyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VvH2aM_CCdil6AAuu-KU_0CEReTlj7W8y7Mm7G2EaYQ