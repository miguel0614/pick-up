const express = require('express')
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()

const cassandra = require('cassandra-driver');

const username = process.env.user
const password = process.env.pass
const keyspace = process.env.keyspace

const client = new cassandra.Client({
    cloud: { secureConnectBundle: './secure-connect-pick-up.zip' },
    credentials: { username: username, password: password },
    keyspace: keyspace
  });

  // SAMPLE QUERY
  client.execute("select * from users").then(data => console.log(data))


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