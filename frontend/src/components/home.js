import React from 'react'
import List from './List.js'
function Home(){
  if(props.userObject){
    return(
      <List />
    )
  }else{
    return <h1>It is good to be home, but sign up or log in to continue.</h1>
  }
}
export default Home