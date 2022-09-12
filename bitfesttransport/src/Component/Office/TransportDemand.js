import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';

import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/signup.module.css';
function TransportDemand()
{
    const [redi,setRedi]=useState(false);
    const schema=yup.object().shape({
        students:yup.string().required("Students is required"),
        teachers:yup.string().required("teachers is required"),
        staff:yup.string().required("Staff is required"),
        others:yup.string().required("Others is required")
        
    }).required();
    let {register,handleSubmit,setError, formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const [students,setStudents]=React.useState('');
    const [teachers,setTeachers]=React.useState('');
    const [staff,setStaff]=React.useState('');
    const [others,setOthers]=React.useState('');
    const [routeNumber,setRouteNumber]=React.useState('');
    const [time,setTime]=React.useState('');
    const handleChange= (e)=>{
        //  console.log(e);
          const change=e.target.value;
        //  console.log("Abid"+change);
          if(e.target.name==="students")
          setStudents(change);
          else if(e.target.name==="teachers")
          setTeachers(change);
        else if(e.target.name==="staff")
          setStaff(change);
          else if(e.target.name==="routeNumber")
          setRouteNumber(change);
        else if(e.target.name==="time")
          setTime(change);
          else 
          setOthers(change);
        
        }
    const submit=(e)=> {
      axios.post("https://localhost:7282/TBus/trans-demands",{
       students,staff,teachers,sthers:others,routeNumber,time
      },{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then((data)=>{
       if(data.status===200){
         console.log(data);
         setTeachers("");
         setStudents("");
         setStaff("");
         setOthers("");
         setRedi(true);
         
         
     }}).catch(err=>
       {
        console.log(err);
        
       });
    /*   setName("");
       setUserName("");
       setPassword("");
       setPhone("");*/
       
     
      return console.log(e);
    }
return(
    <div className={style.login1}>
  <div className={style.login}>
      <h1>Transport Demand</h1>
      <form onSubmit={ handleSubmit(submit)}>
      <input
          type="text"
          name="routeNumber"
          value={routeNumber}
          placeholder="routeNumber"
          required="required"
          {...register('routeNumber')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.routeNumber?.message}</p>
          <input
          type="text"
          name="time"
          value={time}
          placeholder="time"
          required="required"
          {...register('time')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.time?.message}</p>
      <input
          type="text"
          name="students"
          value={students}
          placeholder="students"
          required="required"
          {...register('students')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.students?.message}</p>
        <input
          type="text"
          name="teachers"
          value={teachers}
          placeholder="Teachers"
          required="required"
          {...register('teachers')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.teachers?.message}</p>
        <input
          type="text"
         placeholder="staff"
         value={staff}
          required="required"
          {...register('staff')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.staff?.message}</p>
        <input
          type="others"
         placeholder="others"
         value={others}
          required="required"
          {...register('others')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.others?.message}</p>
        <button type="submit" className={style.btn}>
        TransportDemand
        </button>
       
      </form>
    </div>
    {redi&&<Navigate to="/office/home"></Navigate>}
 </div>
)
}

export default TransportDemand;