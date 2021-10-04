const BlogPost = require('../models/BlogPost.js')


module.exports = async (req, res) => {
	let r = /^[\[\]\$%\^\&\*\)\(.|\\]+$/g
	let searchString = req.body.searchPost
	let blogposts = ""
	if (!r.test(searchString) && searchString) {
		blogposts = await BlogPost.find({"title": new RegExp(req.body.searchPost, 'i')}).populate('userid')
		console.log(req.session)
		res.render('searchPost', {
			blogposts,
			searchString,
		})
	}
	else {
		res.render('searchPost', {
			blogposts,
			searchString,
		})
	}
	
}


