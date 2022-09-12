import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/signup.module.css';
function EditProfile()
{
    const [what,setWhat]=useState(false);
    const schema=yup.object().shape({
       
      name:yup.string().min(4).required("Name is required or Name needs to be more than 4 characters"),
      batchNumber:yup.string().required("Batch Number is required"),
      section:yup.string().required("Section is required")
    
    }).required();
    const {register,handleSubmit,formState:{errors}} =useForm({resolver: yupResolver(schema)})
   
    const [name,setName]=React.useState('');
    const [batchNumber,setBatchNumber]=React.useState('');
    const [section,setSection]=React.useState('');

    const handleChange= (e)=>{
        //  console.log(e);
          const change=e.target.value;
        //  console.log("Abid"+change);
          if(e.target.name==="name")
          
          setName(change);
        else if(e.target.name==="batchNumber")
          setBatchNumber(change);
          else
          setSection(section);
         
        
        }
        useEffect(()=>{
            let fd=new FormData();
            fd.append("userName",localStorage.getItem("userName"));
            axios.get("https://localhost:7282/CAccount/get-student",{headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
              }}).then(data=>{
                if(data.status===200)
                {
                    setBatchNumber(data.data.batchNumber);
                    setName(data.data.name);
                    setSection(data.data.section);
                    setWhat(true);
                }
              }).catch(e=>{
                console.log(e);
              })
        },[])
    const submit=(e)=> {
   
     
      axios.post(`https://localhost:7282/CAccount/update-student`,{
      name,batchNumber,section,userName:localStorage.getItem("userName")
       },{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then((data)=>{
        if(data.status===200){
          console.log(data);
         
     
        
      }}).catch(err=>
        {
          console.log(err);
       
        });
      
       
     
      return console.log(e);
    }
return(
    <div className={style.login1}>
 {what&& <div className={style.login}>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit(submit)}>
      <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          required="required"
          {...register('name')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.name?.message}</p>
       
        <p className={style.error}>{errors.phone?.message}</p>
        <input
          type="text"
         placeholder="Batch Number"
         value={batchNumber}
          required="required"
          {...register('batchNumber')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.batchNumber?.message}</p>
        <input
          type="text"
         placeholder="Section"
         value={section}
          required="required"
          {...register('section')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.section?.message}</p>
        <button type="submit" className={style.btn}>
         Update
        </button>
        <NavLink className={style.btn} to="/office/signup">
              Signup
            </NavLink>
      </form>
    </div>}
 </div>
)
}

export default EditProfile;