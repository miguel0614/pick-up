const db = require('./dbConnection.service')

const query = "Insert into meeting (seller, buyer, time, price, location, latitude, longitude) values "

async function post_new_meeting(req){
    data = db.client.execute(query)
}

module.exports = {post_new_meeting: post_new_meeting}