const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
	name: String,
	lastname: String,
	email: { type: String, unique: true },
	password: String,
	role: { type:String, enum: ['admin', 'user'], default: 'user' }
})

const User = mongoose.model('User', UserSchema)

module.exports = User