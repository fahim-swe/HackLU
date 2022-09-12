import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/busshowcase.module.css';

function BusandRoute()
{
    const [buses,setBuses]=useState([]);
useEffect(()=>{
    axios.get("https://localhost:7282/TBus/get-buses-on-route",{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then(data=>{
        console.log(data);
        setBuses(data.data.data);
      }).catch(e=>{
        console.log(e);
      })
},[])
return(
        <div className={styles.table_wrapper}>

<table className={styles.table}>
    <thead>
  <tr>
    <th>Route Number</th>
    <th >Time</th>
    <th>Bus License</th>
    <th >Stoppage Points</th>
    <th >Bus Id</th>
   
    </tr>
    </thead>
  <tbody>
    {buses.map((e)=>{
        return (
            <tr>
            <td >{e.routeNumber}</td>
            <td >{e.time}</td>
            <td >{e.license}</td>
            <td >{e.stoppagePoint}</td>
            <td >{e.busId}</td>
          </tr>
        )
    })}
 
  
  </tbody>
</table>
    </div>
)
}

export default BusandRoute;