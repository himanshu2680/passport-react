import React from 'react'
import List from './list.js'
function Home(props){
  //props- userObject, updateUser(f)
  if(props.userObject.loggedIn){
    return(
      <List userObject={props.userObject} updateUser={props.updateUser}/>
    )
  }else{
    return <h1>It is good to be home, but sign up or log in to continue.</h1>
  }
}
export default Home