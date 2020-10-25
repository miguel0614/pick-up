const db = require('./dbConnection.service')

async function post_new_meeting(req){
    console.log(req)
    const query = `Insert into meeting (seller, buyer, time, price, location, latitude, longitude) values ('${req.seller.replace(/"/g, "'")}','${req.buyer.replace(/"/g, "'")}','${req.time.replace(/"/g, "'")}',
    '${req.price.replace(/"/g, "'")}','${req.location.replace(/"/g, "'")}','${String(req.latitude).replace(/"/g, "'")}','${String(req.longitude).replace(/"/g, "'")}')`
    console.log(query)
    db.client.execute(query)
}

module.exports = {post_new_meeting: post_new_meeting}