import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Navbar(props){
  //prop 1: loggedIn
  function logout(e){
    e.preventDefault()
    axios.post("/user/logout").then(response=> {
      console.log(response.data)
      if (response.status === 200){
        props.updateUser({loggedIn: false, username:null})
      }
    })
  }
  const ts = "text-secondary"
  return (<div>
      <header className="navbar App-header" id="nav-container">
        <div className="col-4">
          {props.loggedIn?(
            <section className="navbar-section">
              <Link to="#" className="btn btn-link text-secondary"  onClick={logout}>
                <span className={ts}>logout</span>
              </Link>
            </section>
          ):(
            <section>
              <Link to="/" className={"btn btn-link"+ts}>
                <span className={ts}>home</span>
              </Link>
              <Link to="/login" className={"btn btn-link"+ts}>
                <span className={ts}>login</span>
              </Link>
              <Link to="/signup" className={"btn btn-link"+ts}>
                <span className={ts}>signup</span>
              </Link>

            </section>
          )}
        </div>
      </header>
    </div>)
}
export default Navbar