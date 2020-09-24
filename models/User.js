const mangoose = require('mangoose')
const Schema = mangoose.Schema

const UserSchema = new Schema ({
	name: String,
	lastname: String,
	email: String,
	password: String
})

const User = mangoose.model('User', UserSchema)

module.exports = User