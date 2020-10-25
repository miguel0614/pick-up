const express = require('express')
const app = express()
const bodyParser = require("body-parser")
var fs = require('fs');
var util = require('util');
require("dotenv").config()

const {client} = require('./services/dbConnection.service')
const queries = require('./services/queries.service')

// Redirect log to file 
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
console.log = function(d) {
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};  

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
  
  const server = app.listen(8080, () => console.log("Listening on port: " + 8080));
  
  app.get("/get_usernames", (req, res) => {
    console.log("User names requested by: " + req.ip)
    queries.get_usernames().then(usernames => res.send(JSON.stringify(usernames)))
  })

  app.get("/get_names", (req, res) => {
    console.log("Names requested by: " + req.ip)
    queries.get_names().then(names => res.send(JSON.stringify(names)))
  })

  app.post("/post_new_meeting", (req, res) => {
    console.log("Names requested by: " + req.ip)
    queries.post_new_meeting(JSON.parse(req.body.meeting)).then(() => res.send(JSON.stringify("SUCCESS")))
  })