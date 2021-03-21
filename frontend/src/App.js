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
  useEffect(()=>{
    getUser()
  })
  function updateUser(userObject){
    setUserObject(userObject)
  }
  
  //this function makes a get request to the users route and checks to see  
    //if there is a user logged in, if there is, then the state of the user 
      //object in app.js is updated and notes page is rendered.
  function getUser(){
    axios.get('/user/').then(response => {
      
      const gotUser = response.data.user
      console.log(response.data)
      
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
          <LoginForm updateUser={updateUser} />
        </Route>        
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
