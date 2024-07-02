const mongoose = require('mongoose')

const DbConnection = (url)=>{
    mongoose.connect(url)
}

module.exports = DbConnection