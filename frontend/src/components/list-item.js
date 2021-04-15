import React, {useState} from "react"

function ListItem(props){
  /*
  props:-
  index-item._id
  itemName
  isChecked
  deleteHandler(f)
  checkHandler(f)
  */
  var [isChecked, SetIsChecked] = useState(props.isChecked)
  function checkHandler(e) {
    SetIsChecked(!isChecked)
    props.checkHandler(props.index, isChecked)
  }
  return (
    <div className="item flex">
      <input 
        type="checkbox" 
        onChange={checkHandler}
        checked={isChecked}
      />
        <p className="item-p">{props.itemName}</p>
        <button 
          className="bt-close-container" onClick={()=>{props.deleteHandler(props.index)}}>
          <img src="close.svg" alt="close" className="bt-close" />
        </button>
    </div>
  )
}

export default ListItem