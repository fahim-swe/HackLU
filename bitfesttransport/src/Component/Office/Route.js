import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/signup.module.css';
function AddRoute()
{
    const schema=yup.object().shape({
        locationName:yup.string().min(4).required("Location is required"),
      latitude:yup.string().required("Latitude is required"),
      longitude:yup.string().required("Username is required or Username needs to be more than 4 characters"),
      stoppagePoint:yup.string().min(15).required("Stoppage points are required"),
      startTime:yup.string().min(2).required("Start Time is required")
        
    }).required();
    const {register,handleSubmit,formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const [locationName,setLocationName]=React.useState('');
    const [latitude,setLatitude]=React.useState('');
    const [longitude,setLongitude]=React.useState('');
    const [startTime,setStartTime]=React.useState('');
    const [stoppagePoint,setStoppagePoint]=React.useState("");
    const handleChange= (e)=>{
        //  console.log(e);
          const change=e.target.value;
        //  console.log("Abid"+change);
          if(e.target.name==="locationName")
          setLocationName(change);
          else if(e.target.name==="latitude")
          setLatitude(change);
        else if(e.target.name==="startTime")
        setStartTime(change);
        else if(e.target.name==="stoppagePoint")
        setStoppagePoint(change)
          else 
          setLongitude(change);
        
        }
    const submit=(e)=> {
      axios.post("https://localhost:7282/TBus/create-bus-route",{
        locationName,latitude,longitude,Time:startTime,stoppagePoint
      },{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then((data)=>{
       if(data.status===200){
         console.log(data);
         setStartTime("");
       setLocationName("");
       setLongitude("");
       setLatitude("");
       setStoppagePoint("");
     }}).catch(err=>
       {
         console.log(err);
      
       });
     /* setLocationName("");
      setLongitude("");
      setLongitude("");
      setStartTime("");*/
       
     
      return console.log(e);
    }
return(
    <div className={style.login1}>
  <div className={style.login}>
      <h1>Add Route</h1>
      <form onSubmit={ handleSubmit(submit)}>
      <input
          type="text"
         placeholder="locationName"
         value={locationName}
          required="required"
          {...register('locationName')} 
          onChange={handleChange}
        />
          <p className={style.error}>{errors.locationName?.message}</p>
      <input
          type="text"
          name="longitude"
          value={longitude}
          placeholder="longitude"
          required="required"
          {...register('longitude')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.longitude?.message}</p>
        <input
          type="text"
          name="latitude"
          value={latitude}
          placeholder="latitude"
          required="required"
          {...register('latitude')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.latitude?.message}</p>
        <input
          type="text"
         placeholder="startTime"
         value={startTime}
          required="required"
          {...register('startTime')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.startTime?.message}</p>
        <input
          type="text"
          name="stoppagePoint"
          value={stoppagePoint}
          placeholder="Stoppage Points"
          required="required"
          {...register('stoppagePoint')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.stoppagePoint?.message}</p>
        <button type="submit" className={style.btn}>
         Add Route
        </button>
       
      </form>
    </div>
 </div>
)
}

export default AddRoute;