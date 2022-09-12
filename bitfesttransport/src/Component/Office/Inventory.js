import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/signup.module.css';
function Inventory()
{
    const schema=yup.object().shape({
        license:yup.string().min(6).required("License is required"),
      capacity:yup.number().min(10).required("Capacity of the vehicle is required or Capacity of the vehicle has to be more than 10"),
      driverName:yup.string().min(4).required("Driver Name is required or Driver Name needs to be more than 4 characters"),
      phone:yup.string().min(11).max(11).required("Phone number is required"),
        
    }).required();
    const {register,handleSubmit,formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const [license,setLicense]=React.useState('');
    const [capacity,setCapacity]=React.useState(0);
    const [driverName,setDriverName]=React.useState('');
    const [phone,setPhone]=React.useState('');
    const handleChange= (e)=>{
        //  console.log(e);
          const change=e.target.value;
        //  console.log("Abid"+change);
          if(e.target.name==="license")
          setLicense(change);
          else if(e.target.name==="capacity")
          setCapacity(change);
        else if(e.target.name==="driverName")
        setDriverName(change);
          else 
          setPhone(change);
        
        }
    const submit=(e)=> {
      axios.post("https://localhost:7282/TBus",{
        license: license,
        capacity: capacity,
        driverName: driverName,
        phone:phone,
        isActive:true,
        isAvailable:true
      },{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then((data)=>{
       if(data.status===200){
         console.log(data);
         setLicense("");
        setCapacity(0);
        setDriverName("");
       setPhone("");
     }}).catch(err=>
       {
         console.log(err);
      
       });
       
       
     
      return console.log(e);
    }
return(
    <div className={style.login1}>
  <div className={style.login}>
      <h1>Add Inventory</h1>
      <form onSubmit={ handleSubmit(submit)}>
      <input
          type="text"
          name="license"
          value={license}
          placeholder="License Number"
          required="required"
          {...register('license')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.license?.message}</p>
        <input
          type="number"
          name="capacity"
          value={capacity}
          placeholder="Capacity"
          required="required"
          {...register('capacity')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.capacity?.message}</p>
        <input
          type="text"
         placeholder="driverName"
         value={driverName}
          required="required"
          {...register('driverName')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.driverName?.message}</p>
        <input
          type="text"
         placeholder="Phone"
         value={phone}
          required="required"
          {...register('phone')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.phone?.message}</p>
        <button type="submit" className={style.btn}>
         Add Inventory
        </button>
        
      </form>
    </div>
 </div>
)
}

export default Inventory;