import React, {useState} from "react"
import axios from "axios"

function Signup(){
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  function handleSubmit(e){
    e.preventDefault()
    axios.post("/user/", {
      userName: userName,
      password: password
    }).then(response=>{
      console.log(response)
      
    }).catch(error=>console.log(error))
    setUserName(""); setPassword("")
  }
  return (
    <div>
      <h4>signup</h4>
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

export default Signup