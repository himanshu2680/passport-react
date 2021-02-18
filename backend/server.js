//fold init code
require('dotenv').config()
const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./user.model.js')
const bcrypt = require('bcryptjs')

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}
const app = express()
app.use(session(sessionOptions))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use(bodyParser.json())
mongoose.connect(
  "mongodb://localhost:27017/passportReactDB",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex: true})
app.use(passport.initialize())
app.use(passport.session())

///fold init code

app.post("/signup", (req, res)=>{
  var {userName, password}=req.body
  if(userName && password){
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(password, salt, (err, hash)=>{
        var newUser = new User({userName:userName, password:hash})
        newUser.save()
      })
    })
  }
  res.send(newUser)
})

app.post("/login", (req, res)=>{
  User.findOne({userName:req.body.userName}, (err, user)=>{
    if (err) {
      console.log(err)
    }
    if(!user){
      console.log("user not found")
    }
    bcrypt.compare(req.body.password, user.password, (err, result)=>{
      if(result){
        passport.authenticate("local")(req, res, ()=>{
          console.log(req.session.passport.user)
          res.status(200).send({userName:user.userName, _id:user._id})
        })
      }else{
        res.status(418).send("password incorrect")
      }
    })
  })
})


//fold server started
app.listen(process.env.PORT || 5000, function(){
  console.log("Server started successfully(5000)");
})
///fold server started
//{origin: 'http://localhost:3000', optionsSuccessStatus: 200}