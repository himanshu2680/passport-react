import React, {useState} from "react"
import ListItem from "./ListItem"
import Axios from "axios"

function List(){
  const url="http://localhost:5000"
  const [formData, setFormData] = useState([])
  
  Axios.get(url+"/formData").then(res=>{setFormData(res.data)}).catch(err=>console.log(err))
  
  function submitHandler(e){ 
    Axios.post(url+"/formData", {itemName:e.target.itemName.value, isChecked:false})
    e.preventDefault()
    Axios.get(url+"/formData").then(res=>{setFormData(res.data);})
    e.target.itemName.value=""
  }
  
  function deleteHandler(index){
    Axios.post(url+"/delete", {_id: index})
  }
  
  function checkHandler(index, isChecked){
    Axios.post(url+"/check", {_id:index, isChecked:isChecked})
  }

  return(
    <div>
      
      <div className="box" id="heading">
        <h1>ToDo List</h1>
      </div>
      
      <div className="box">
          {formData.map((item)=><ListItem 
            key={item._id}
            index={item._id}
            itemName={item.itemName} 
            isChecked={item.isChecked} 
            deleteHandler={deleteHandler} 
            checkHandler={checkHandler} 
          />)}
        <form onSubmit={submitHandler} className="item">
          <input className="itemsInput" placeholder="New Item" type="text" name="itemName" autoComplete="off" autoFocus required/>
          <button type="submit" className="add">+</button>
        </form>
      </div>   
         
    </div>
  )
}

export default List