const bcryptjs = require('bcryptjs')
const User = require('../models/User.js')

module.exports = (req, res) =>{
	const { username, password } = req.body
	
	User.findOne({username:username}, (error,user) => {
		if (user){
			bcryptjs.compare(password, user.password, (error, same) =>{
				if(same){// if passwords match
					//store user session, will talk about it later
					req.session.userId = user._id
					res.redirect('/')
				}
				else{
					res.redirect('/auth/login')
				}
			})
		}
		else{
			res.redirect('/auth/login')
		}
	})
}