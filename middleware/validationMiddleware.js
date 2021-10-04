module.exports = (req,res,next)=>{
	if(!req.files || !req.body.title || !req.body.body || !req.body.details){
		return res.redirect('/posts/new')
	}
	next()
}