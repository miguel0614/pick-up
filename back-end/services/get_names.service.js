const db = require('./dbConnection.service')

const query = "select username, first_name, last_name from users"

async function get_names(){
    data = db.client.execute(query).then(data => {
        let names = {}
        for (row of data.rows){
            names[row['username']] = row['first_name'] + " " + row['last_name']
        }
        return names
    })
    return data
}

module.exports = {get_names: get_names}