const express = require("express");
const app = express();
const cors = require('cors');

require("dotenv").config()
const port = process.env.PORT || 4000

// cors configuration
app.use(
    cors({
        origin:"*",
    })
);

// middleware
app.use(express.json());

// route mount
const employeeRoute = require("./Routes/Route");
app.use("/api/v1", employeeRoute);


// call db connect function
const {dbConnect}= require("./Config/database")
dbConnect();

// server activation
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});