import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Navbar(props){
  //prop 1: updateUser
  //prop 2: loggedIn
  function logout(e){
    e.preventDefault()
    axios.post("http://localhost:5000/logout", {logout: true}, {withCredentials: true}).then(response=> {
      console.log(response.data)
      if (response.data.msg === "success"){
        props.updateUser({loggedIn: false, username:null, _id:null})
      }
    })
  }
  return (<div>
      <header className="navbar App-header" id="nav-container">
        <div className="col-4">
          {props.loggedIn?(
            <section className="navbar-section">
              <Link to="#" className="btn btn-link text-secondary"  onClick={logout}>
                <span className="text-secondary">logout</span>
              </Link>
            </section>
          ):(
            <section>
              <Link to="/" className="btn btn-link text-secondary">
                <span className="text-secondary">home</span>
              </Link>
              <Link to="/login" className="btn btn-link text-secondary">
                <span className="text-secondary">login</span>
              </Link>
              <Link to="/signup" className="btn btn-link text-secondary">
                <span className="text-secondary">signup</span>
              </Link>
            </section>
          )}
        </div>
      </header>
    </div>)
}
export default Navbar