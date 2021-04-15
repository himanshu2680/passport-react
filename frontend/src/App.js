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
     _id:null})
  const [loginMessage, setLoginMessage]=useState("")
  useEffect(()=>{
    getUser()

  }, [])
  function updateUser(userObject){
    setUserObject(userObject)
  }
  
  function updateLoginMessage(message){
    setLoginMessage(message)
  }
  
  function getUser(){
    axios.get('http://localhost:5000/', {withCredentials: true}).then(response => {
      console.log(response.data);
      const gotUser = response.data.user
      if(gotUser){
        setUserObject({
          loggedIn: true, 
          username: gotUser.username, 
          _id:gotUser._id
        })
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
          <Home />
        </Route>
        <Route path="/login">
          <LoginForm updateUser={updateUser} loginMessage={loginMessage} updateLoginMessage={updateLoginMessage}/>
        </Route>        
        <Route path="/signup">
          <Signup userObject={userObject} updateLoginMessage={updateLoginMessage}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
