const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Connected to database")})
    .catch((error)=>{
        console.log(error)
        console.log("Error connecting to database");
    })
}   
