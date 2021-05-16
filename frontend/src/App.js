//packages
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Route, Link, Switch} from 'react-router-dom'
//components
import Signup from './components/Signup.js'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'
//react

function App() {
  const [userObject, setUserObject]=useState(
    {loggedIn: false,
     username: null, 
     _id:null,
     data:null})
  const [loginMessage, setLoginMessage]=useState("")
  useEffect(()=>{
    getUser()

  }, [])
  function updateUser(userObject){
    console.log("reached start of updateUser, id at this point: " + userObject._id);
    setUserObject(userObject)
    console.log("reached end of updateUser, id at this point: " + userObject._id);
  }
  
  function updateLoginMessage(message){
    setLoginMessage(message)
  }
  
  function getUser(){
    axios.get('http://localhost:5000/', {withCredentials: true}).then(response => {
      console.log(response.data)
      const gotUser = response.data.user
      if(gotUser){
        setUserObject({
          loggedIn: true, 
          username: gotUser.username, 
          _id:gotUser._id,
          data:gotUser.data
        })
        console.log(gotUser._id + "gotUser id")
        console.log(userObject._id + "userObject id")
      }
    })
  }
  
  return (
    <div className="App">
      <Navbar updateUser={updateUser} loggedIn={userObject.loggedIn}/>
      {userObject.loggedIn && <div>
        {/*write code here which renders if an existing user who has already logged in navigates to the home page.*/}
        <h2> hello, {userObject.username} </h2>
        </div>}
       
      
      {/* Routes to different components */}
      <Switch>        
        <Route exact path="/">
          <Home userObject={userObject} updateUser={updateUser}/>
        </Route>
        <Route path="/login">
          <LoginForm updateUser={updateUser} loginMessage={loginMessage} updateLoginMessage={updateLoginMessage}/>
        </Route>        
        <Route path="/signup">
          <Signup updateLoginMessage={updateLoginMessage}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App
