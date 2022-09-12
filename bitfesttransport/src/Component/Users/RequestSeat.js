import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import bus from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/bus.jpeg';

import * as yup from 'yup';
import styles from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/signup.module.css';

function RequestSeat()
{
    const [what,setWhat]=useState(false);
    const [emptySeats,setEmptySeats]=useState([]);
    const [time,setTime]=React.useState('');
    const [routeName,setRouteName]=React.useState('');
    const [hide,setHide]=useState(true);
    const [text,setText]=useState("");
    const schema=yup.object().shape({
       
        time:yup.string().required("Time is required"),
        routeName:yup.string().required("Route Number is required ")
          
      }).required();
      const {register,handleSubmit,formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const handleChange= (e)=>{
        //  console.log(e);
          const change=e.target.value;
        //  console.log("Abid"+change);
          if(e.target.name==="time")
          
          setTime(change);
        else 
          setRouteName(change);
         
        
        }
        useEffect(()=>{
         axios.get("https://localhost:7282/TBus/get-empty-sit",{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(data=>{
            if(data.status===200)
            {
                console.log(data.data);
                setEmptySeats(data.data);
                setWhat(true);
            }
         }).catch(e=>{
            console.log(e);
         })
        },[])
        const submit=()=>{
            setHide(false);
            let p=0;
            for(let i=0;i<emptySeats.length;i++)
            {
                console.log(emptySeats[i].time+" "+time+" "+ emptySeats[i].routeNumber+" "+routeName)
                if(emptySeats[i].time.includes(time)&&emptySeats[i].stoppagePoint.includes(routeName))
                {
                    p++;
                    if(emptySeats[i].emptySeats>0)
                    setText(`Your seat has been booked in the vehicle license number ${emptySeats[i].license}`);
                    else
                    setText(`There is no seat available`);
                }
            }
            if(p===0)
            {
            setText("There is no bus available in this route at your given time")
            }
        }
return(
    <div className={styles.login1}>
   {what&& <div className={styles.login}>
      {hide&& <form onSubmit={ handleSubmit(submit)}>
      <input
          type="text"
          name="Enter time"
          value={time}
          placeholder="Time"
          required="required"
          {...register('time')} 
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.time?.message}</p>
       
       
        <input
          type="text"
         placeholder="Enter Route Number"
         value={routeName}
          required="required"
          {...register('routeName')} 
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.routeName?.message}</p>
        <button type="submit" className={styles.btn}>
         Suggested Buses
        </button>
        </form>}
        {!hide&&<div className={styles.showText}>
            <img src={bus} alt="Bus"></img>
        <p>{text}</p>
        </div>}
    </div>}
    </div>
)
}

export default RequestSeat;