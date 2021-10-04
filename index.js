const express = require('express')
const app = new express()
//const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
const customMiddleware = (req,res,next)=>{
	console.log('Custom middle ware called')
	next()
}
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const flash = require('connect-flash')



const searchPostController = require('./controllers/searchPost')



/*
const validateMiddleware = (req,res,next)=>{
	if(!req.files || !req.body.title || !req.body.body || !req.body.details){
		return res.redirect('/posts/new')
	}
	next()
}
*/

const validateMiddleware = require('./middleware/validationMiddleware')


mongoose.connect('mongodb://user:[mongodb][#atlas]@cluster0-shard-00-00-rropi.mongodb.net:27017,cluster0-shard-00-01-rropi.mongodb.net:27017,cluster0-shard-00-02-rropi.mongodb.net:27017/my_database?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin', {useNewUrlParser:true})

app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(customMiddleware)
app.use('/posts/store',validateMiddleware)
app.use(expressSession({
	secret: 'keyboard cat'
}))

global.loggedIn = null

app.use("*", (req, res, next) => {
	loggedIn = req.session.userId
	next()
})
app.use(flash())

let port = process.env.PORT
if (port == null || port == "") {
	port = 4000
}










app.get('/auth/logout', logoutController)
app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', authMiddleware, storePostController)



app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)



app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)



app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)



app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.listen(port, ()=>{
    console.log('App listening...')	
})

/*app.listen(4000, ()=> {
	console.log('App listening on port 4000')
})*/

/*
app.get('/',async (req, res)=>{
	const blogposts = await BlogPost.find({})
	console.log(blogposts)
	res.render('index',{
		blogposts
	})
})
*/

app.get('/post/:id',async (req, res)=>{
	const blogpost = await BlogPost.findById(req.params.id)
	res.render('post',{
		blogpost
	})
})



app.get('/posts/new',authMiddleware, newPostController)

/*
app.post('/posts/store', async (req, res) => {
	let image = req.files.image
	image.mv(path.resolve(__dirname,'public/img',image.name),async (error)=>{
			await BlogPost.create({
				...req.body,
				image:'/img/' + image.name
			})
			res.redirect('/')
	})
})
*/
app.post('/searchPost', searchPostController)

app.use((req, res) => res.render('notfound'))


















