const express = require('express')
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    next()
  })
  
  app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
  }));
  
  const server = app.listen(8080, () => console.log("Listening"));
  
  app.get("/ROUTE", (req, res) => {
    res.send("DATA")
    //or
    res.sendFile("FILEPATH")
  })

    console.log("testing")