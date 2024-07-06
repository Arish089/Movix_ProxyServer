const express = require('express')
const axios = require('axios')
require('dotenv').config()

const ProxyRouter = express.Router()

const baseurl = 'https://api.themoviedb.org/3'

ProxyRouter.get('/data',async (req,res)=>{
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

ProxyRouter.get('/movie/:id',async (req,res)=>{
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
       // console.log(resp1,resp1.data);
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

ProxyRouter.get('/tv/:id',async (req,res)=>{
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

ProxyRouter.get('/search/:searchquery', async (req, res)=>{
  const {searchquery} = req.params
  const {page,filter} = req.query
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


ProxyRouter.get('/anime', async (req, res)=>{
  const {page, sort_by ,with_origin_country}=req.query
  try {
    let resp = await axios({
      method:'get',
      baseURL:`https://api.themoviedb.org/3`,
      url:`/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&with_genres=16`,
      headers:{
        'accept': 'application/json',
        'Authorization':
        `Bearer ${process.env.API_KEY}` 
      },
      params:{
        page: page,
        sort_by: sort_by,
        with_origin_country: with_origin_country
      }
    })
    res.status(200).send(resp.data)
  } catch (error) {
    res.status(error.response ? error.response.status: 500).send(error)
  }
})

module.exports = ProxyRouter