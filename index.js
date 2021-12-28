const express = require('express');
const app = express();
const path = require("path");
require("dotenv").config({path:path.resolve(__dirname, 'config/.env')});
const DB=require("mongoose");
const cors=require("cors")
const config = require("config")
const route = require('./route/route');
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended:true}));
app.use(cors())
app.use("/api",route);

const PORT = process.env.PORT||config.get('PORT')||5000
/*
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}*/
//app.use(express.urlencoded({extended:true}));
//import variables
app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


//launching function server and DB connection
async function start(){
    try{
        await DB.connect(config.get('uri'),{useNewUrlParser:true, useUnifiedTopology:true})
        app.listen(PORT,"0.0.0.0",()=>{console.log("server runned")})
        console.log("connection is successful")
    }catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}
start();

