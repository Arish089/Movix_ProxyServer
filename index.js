const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
const DbConnection = require('./config/db')
const UserRouter = require('./routes/user.routes')
const ProxyRouter = require('./routes/proxy.routes')
const WatchlistRouter = require('./routes/watchlist.routes')
const FavoriteRouter = require('./routes/favorite.routes')


require('dotenv').config()

const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/api',ProxyRouter)

app.use('/user',UserRouter)
app.use('/watchlist',WatchlistRouter)
app.use('/favorite',FavoriteRouter)

app.listen(port,async()=>{
await DbConnection(process.env.DB_URL)
console.log('Server is running',port);
console.log('Connected to database');
})

