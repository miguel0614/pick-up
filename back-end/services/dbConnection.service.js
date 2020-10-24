const cassandra = require('cassandra-driver');
require("dotenv").config()

const username = process.env.user
const password = process.env.pass
const keyspace = process.env.keyspace

const client = new cassandra.Client({
    cloud: { secureConnectBundle: './secure-connect-pick-up.zip' },
    credentials: { username: username, password: password },
    keyspace: keyspace
  });

  module.exports = {client: client}