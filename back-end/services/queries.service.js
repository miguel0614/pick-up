const { get_usernames } = require("./get_usernames.service")
const { get_names } = require("./get_names.service")
const {post_new_meeting} = require('./post_new_names.service')
module.exports = {get_usernames: get_usernames, get_names: get_names, post_new_meeting: post_new_meeting}