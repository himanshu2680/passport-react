import React, {useState} from "react"
import ListItem from "./list-item"
import axios from "axios"

function List(props){
  /*props-
  userObject
  */
  const url="http://localhost:5000"
  const [inputValue, setInputValue] = useState("")
  
  function submitHandler(e){ 
    e.preventDefault()
    var {value} = e.target.itemName
    axios.post(url+"/save", {newListItem:{itemName:value, isChecked:false}, userId:props.userObject._id})
    .then({
      //update the state here using res gotten back from the server.
    })
    e.target.itemName.value=""
  }
  


  return(
    <div>
      
      <div className="box" id="heading">
        <h1>ToDo List</h1>
      </div>
      
      <div className="box">
          {props.userObject.data && props.userObject.data.map((item)=><ListItem 
            key={item._id} //only for react. do not access it.
            item={item}
            userId={props.userObject._id}
            updateUser={props.updateUser}
          />)}
          
        <form onSubmit={submitHandler} className="item">
          <input
            className="itemsInput"
            placeholder="New Item"
            type="text"
            name="itemName"
            onChange={e=>setInputValue(e.target.value)}
            value={inputValue}
            autoComplete="off"
            autoFocus
            required
          />
          <button type="submit" className="add">+</button>
        </form>
      </div>   
         
    </div>
  )
}

export default List