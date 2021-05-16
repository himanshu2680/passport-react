import React, {useState} from "react"
import axios from "axios"
function ListItem(props){
  /*
  props:-
  item, userId, updateUser(f)
  */
  const url = "http://localhost:5000"
  const {_id, isChecked, itemName} = props.item
  function checkHandler(e) {
    axios
    .post(url+"/check", {userId:props.userId, itemId:_id})
    .then(res=>{
      console.log(res.data);
    })
  }
  function deleteHandler(itemId){
    axios
    .post(url+"/delete", {userId:props.userId, itemId:_id})
    .then(res=>{
      console.log(res.data);
    })
  }
  return (
    <div className="item flex">
      <input 
        type="checkbox"
        onChange={checkHandler}
        checked={isChecked}
      />
        <p className="item-p">{itemName}</p>
        <button 
          className="bt-close-container" onClick={deleteHandler}>
          <img src="close.svg" alt="close" className="bt-close" />
        </button>
    </div>
  )
}

export default ListItem