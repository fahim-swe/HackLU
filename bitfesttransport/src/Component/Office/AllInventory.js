import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/busshowcase.module.css';

function AllInventory()
{
    const [redi,setRedi]=useState(false);
    const [what,setWhat]=useState(false);
    const [buses,setBuses]=useState([]);
    const [avBuses,setavBuses]=useState([]);
    useEffect(()=>{
      
         axios.get("https://localhost:7282/TBus/avaiable-bus",{headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
          }}).then((data1)=>{
            if(data1.status===200){
             console.log(data1.data);
             setavBuses(data1.data);
              setRedi(true);
             setWhat(true);
          }}).catch(err=>
            {
              console.log(err);
           
            });;     
    },[])
return(
  <div>
  {what&& <div>
     <h2 className={styles.h2}>Bus Schedules</h2>
<div className={styles.table_wrapper}>


<table className={styles.table}>
    <thead>
  <tr>
    <th>Buses</th>
    <th>License Number</th>
    <th>Capacity</th>
    <th>Driver Name</th>
    </tr>
    </thead>
  <tbody>
    {avBuses.map((e)=>{
        return (
            <tr>
            <td >{e.id}</td>
            <td >{e.license}</td>
            <td >{e.capacity}</td>
            <th>{e.driverName}</th>
          </tr>
        )
    })}
 
  
  </tbody>
</table>

   
    </div>
</div>}
{redi&&<Navigate to="/office/home"></Navigate>}
</div>
)
}

export default AllInventory;