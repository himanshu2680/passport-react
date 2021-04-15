import React, {useState} from "react"
import axios from "axios"
import {Redirect} from "react-router-dom"

function Signup(props){
  //prop 1: userObject from app.js
  //prop 2: updateLoginMessage(f)
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    confirmPassword:""
  })
  const [redirectTo, setRedirectTo] = useState("")
  const [displayMessage, setDisplayMessage]=useState("")
  
  function handleSubmit(e){
    e.preventDefault()
    if(formData.password===formData.confirmPassword){      
      axios.post("http://localhost:5000/signup", {
        username: formData.username,
        password: formData.password
      }).then(response=>{
        console.log(response.data)
        if(response.data.msg!=="fail"){
          setRedirectTo("login")
          props.updateLoginMessage("Signup successful. Please Log in to continue.")
        }
      }).catch(error=>console.log(error))
    }else{
      setDisplayMessage("Passwords do not match. Please try again.")
    }
    setFormData({username:"", password:"", confirmPassword:""})
  }
  function handleChange(e) {
    setDisplayMessage("")
    const inputName=e.target.name
    const newValue=e.target.value
    setFormData(prevValue=>{
      var changed = {[inputName]:newValue}
      var {username, password, confirmPassword} = Object.assign(prevValue, changed)
      
      return {username:username, password:password, confirmPassword:confirmPassword}
      
      //fold working WET code
      // if(inputName==="username"){
      //   return {
      //     username:newValue,
      //     password:prevValue.password,
      //     confirmPassword:prevValue.confirmPassword
      //   }
      // }else if(inputName==="password"){
      //   return {
      //     username:prevValue.username,
      //     password: newValue,
      //     confirmPassword:prevValue.confirmPassword
      //   }
      // }else if(inputName==="confirmPassword"){
      //   return {
      //     username:prevValue.username,
      //     password: prevValue.password,
      //     confirmPassword:newValue
      //   }
      // }
      ///fold
    })
  }
  if (redirectTo){
    return <Redirect to={{pathname:redirectTo}} />
  }else{
    return (
      <div className="SignupForm">
        <h4>Signup</h4>
        <form onSubmit={handleSubmit} className="form-horizontal">
          
          <div className="form-group">
            <div className="col-2 col-ml-auto">
              <label htmlFor="username" className="form-label">Username</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
              className="form-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
             />
            </div>
          </div>
          
          <div className="form-group">
            <div className="col-2 col-ml-auto">
              <label htmlFor="password" className="form-label">Password</label>
            </div>
            <div className="col-3 col-mr-auto">  
            <input
              className="form-input"
               type="password"
               name="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="password"
             />
            </div>
          </div>
          
          <div className="form-group">
            <div className="col-2 col-ml-auto">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                 type="password"
                 name="confirmPassword"
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 placeholder="confirm password"
                />
            </div>
          </div>
          <div className="form-group">
            <div style={{width:"62.5%"}}></div>
            <button
              className="btn btn-primary col-1 col-mr-auto"
              type="submit"
            >Sign up</button>
          </div>
        
        </form>
        <p style={{color:"red"}}>{displayMessage}</p>
      </div>
    )
  }
}

export default Signup