const db = require('./dbConnection.service')

const query = "select username from users"

async function get_usernames(){
    data = db.client.execute(query).then(data => {
        let usernames = []
        for (row of data.rows){
            usernames.push(row.username)
        }
        return usernames
    })
    return data
}

module.exports = {get_usernames: get_usernames}