//fold init code
const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:3000', optionsSuccessStatus: 200, credentials: true}))
 
app.use(session({
  secret: "keyboard-cat",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
mongoose.connect(
  "mongodb://localhost:27017/passportReactDB",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex: true})
const userSchema=new mongoose.Schema({
  username: String,
  password: String
})
userSchema.plugin(passportLocalMongoose)
const User = new mongoose.model("User", userSchema)
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
///fold init code

app.post("/signup", (req, res)=>{
  User.register({username: req.body.username}, req.body.password, (err, user)=>{
    if (err){
      console.log(err);
      res.json({msg:"fail", err:err})
    } else{
      console.log("signup successful");
      res.json({msg:"success", user:user})
    }
  })
})


app.post("/login", (req, res)=>{
  const user = new User({
    username:req.body.username,
    password:req.body.password
  })
  
  req.login(user, (err)=>{
    if(err){
      console.log(err)
    } else {
      passport.authenticate("local")(req, res, ()=>{
        console.log("authenticated req.user: " + req.user)
        res.json({username:user.username, _id:user._id})
      })
    }
  })
  
})


app.get("/", (req, res)=>{
  if (req.user){
    res.json({user: req.user})
  }else {
    res.json({user: null})
  }
})

app.post("/logout", (req, res)=>{
  if(req.user){
    req.logout()
    res.json({msg:"success"})
  }else{
    res.json({msg:"req.user not found"})
  }
})

//fold server started
app.listen(process.env.PORT || 5000, function(){
  console.log("Server started successfully(5000)");
})
///fold server started
