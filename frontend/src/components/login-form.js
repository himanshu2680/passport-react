import React, {useState} from "react"
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Login(props){
  //prop 1- updateUser. It is a function in app.js that takes the user object that logs in as parameter and updates the setUser state in app.js
  const [formData, setFormData] = useState({
    username:"",
    password:""
  })
  const [redirectTo, setRedirectTo] = useState(null)
  const [displayMessage, setDisplayMessage] = useState("")
  function handleSubmit(e){
    console.log(formData.username);
    e.preventDefault()
    axios
      .post("http://localhost:5000/login", {
        username: formData.username,
        password: formData.password
      }, {withCredentials: true})
      .then(response=>{
        console.log(response.data);
        var {username, _id}=response.data
        if (response.status===200 && username && _id) {
          
          props.updateUser({
            loggedIn: true,
            username: username,
            _id: _id
          })
          
          setRedirectTo('/')
        }
        else if(response.status===401) {
          console.log("access denied. your username or password might be incorrect.");
          setDisplayMessage("Incorrect Username or password. Please try again.")
        }
        else{
          console.log("unknown error occured");
          setDisplayMessage("Server error. Please try again later.")
        }
      })
      .catch(error => {
        console.log(error.response.status);
        if(error.response.status===401){
          setDisplayMessage("Incorrect Username or password. Please try again.")
        }else if(error.response.status===400){
          setDisplayMessage("Username and password are required.")
        }else{
          setDisplayMessage("Server error. Please try again later.")
        }
      })
    setFormData({
      username:"", password:""
    })
  }
  function handleChange(e){
    setDisplayMessage("")
    props.updateLoginMessage("")
    const inputName=e.target.name
    const newValue=e.target.value
    setFormData(prevValue=>{
      var changed = {[inputName]:newValue}
      var {username, password}=Object.assign(prevValue, changed)
      return {username:username, password:password}
    })
  }
    if (redirectTo){
      return <Redirect to={{pathname:redirectTo}} />
    }
    else {
      return (
        <div className="loginForm">
          <h4>Login</h4>
          <p>{props.loginMessage}</p>
          <form onSubmit={handleSubmit} className="form-horizontal">
            
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label htmlFor="username" className="form-label">Username</label>
              </div>
              <div className="col-3 col-mr-auto">
                <input
                  placeholder="username"
                  className="form-input"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label htmlFor="password" className="form-label">Password</label>
              </div>
              <div className="col-3 col-mr-auto">
                <input
                  placeholder="password"
                  className="form-input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
             </div>
              
             <div className="form-group ">
               <div className="col-7"></div>
               <button
                 className="btn btn-primary col-1 col-mr-auto"
                 type="submit"
               >Log in</button>
             </div>
             
          </form>
          <p style={{color:"red"}}>{displayMessage}</p>
        </div>
      )
    }
}
export default Login