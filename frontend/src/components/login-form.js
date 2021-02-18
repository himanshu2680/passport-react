import React from "react"
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Login(props){
  //prop 1- updateUser. It is a function in app.js that takes the user object that logs in as parameter and updates the setUser state in app.js
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [redirectTo, setRedirectTo] = useState(null)
  
  function handleSubmit(e){
    e.preventDefault()
    axios
      .post("http://localhost:5000/login", {
        userName: userName,
        password: password
      })
      .then(response=>{
        console.log(response);
        if (response.status===200) {
          
          var {userName, _id}=response.data
          
          props.updateUser({
            loggedIn: true,
            username: userName,
            _id: _id
          })
          
          setRedirectTo('/')
        }
        else if(response.status===401) {
          console.log("access denied. your username or password might be incorrect.");
        }
      })
      .catch(error => {
        console.log(error);
      })
    setUserName(""); 
    setPassword("")
  }
    if (redirectTo){
      return <Redirect to={{pathname:redirectTo}} />
    }
    else {
      return (
        <div>
          <form onSubmit={handleSubmit}>
          <label htmlFor="userName">UserName</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={e=>{setUserName(e.target.value)}}
           />
          <label htmlFor="password">Password</label>
          <input
             type="password"
             name="password"
             value={password}
             onChange={e=>{setPassword(e.target.value)}}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
}
export default Login