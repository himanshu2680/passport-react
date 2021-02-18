//packages
import React from 'react'
import axios from 'axios'
import {Route, Link} from 'react-router-dom'
//components
import Signup from './components/Signup.js'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'
//react
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MERN with passport!
        </p>
        <Signup />
      </header>
    </div>
  )
}

export default App;
