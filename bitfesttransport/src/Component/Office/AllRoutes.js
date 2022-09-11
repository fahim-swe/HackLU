import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/busshowcase.module.css';

function AllRoutes()
{
    const [what,setWhat]=useState(false);
    const [buses,setBuses]=useState([]);
    const [avBuses,setavBuses]=useState([]);
    useEffect(()=>{
       axios.get("https://localhost:7282/TBus/bus-routes",{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then((data)=>{
        if(data.status===200){
         console.log(data.data);
       setBuses(data.data.data);
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
    <th>Route</th>
    <th>Starting Point</th>
    <th style={{width:"50%"}}>Stoppage Points</th>
    </tr>
    </thead>
  <tbody>
    {buses.map((e)=>{
        return (
            <tr>
            <td >{e.routeNumber}</td>
            <td >{e.locationName}</td>
            <td >{e.stoppagePoint}</td>
           
          </tr>
        )
    })}
 
  
  </tbody>
</table>

    </div>
</div>}
</div>
)
}

export default AllRoutes;