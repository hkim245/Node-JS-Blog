const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcryptjs = require('bcryptjs')
let uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
	username: {
		type: String,
		required: [true,'Please provide username'],
		unique: true
	},
	password: {
		type: String,
		required: [true,'Please provide password']
	}
})

UserSchema.pre('save', function(next){
	const user = this
	
	bcryptjs.hash(user.password, 10, (error, hash) => {
		user.password = hash
		next()
	})
})






UserSchema.plugin(uniqueValidator)


// export model
const User = mongoose.model('User',UserSchema)
module.exports = User






















