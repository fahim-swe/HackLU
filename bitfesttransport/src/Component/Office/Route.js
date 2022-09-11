import { yupResolver } from '@hookform/resolvers/yup';
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
      startTime:yup.string().min(8).required("Start Time is required")
        
    }).required();
    const {register,handleSubmit,formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const [locationName,setLocationName]=React.useState('');
    const [latitude,setLatitude]=React.useState('');
    const [longitude,setLongitude]=React.useState('');
    const [startTime,setStartTime]=React.useState('');
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
          else 
          setLongitude(change);
        
        }
    const submit=(e)=> {
   
      setLocationName("");
      setLongitude("");
      setLongitude("");
      setStartTime("");
       
     
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
       
        <button type="submit" className={style.btn}>
         Add Route
        </button>
       
      </form>
    </div>
 </div>
)
}

export default AddRoute;