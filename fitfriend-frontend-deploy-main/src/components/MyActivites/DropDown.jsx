import React from 'react';
import './DropDown.css';
import { useState } from 'react';


const DropDown = (props) => {
  // const [selectWeek,setSelectWeek] = useState(1)


  return (
    <div class="dropdown">
      <button class="dropbtn">Week {props.weekNo}</button>
      <div class="dropdown-content">
         <a href="#" onClick={()=>props.selectWeek(1)}>Week 1</a>
         <a href="#" onClick={()=>props.selectWeek(2)}>Week 2</a>
         <a href="#" onClick={()=>props.selectWeek(3)}>Week 3</a>
         <a href="#" onClick={()=>props.selectWeek(4)}>Week 4</a>

      </div>
    </div>
  );
}





export default DropDown;