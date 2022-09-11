import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/signup.module.css';
function Register()
{
  const arr1=useRef([]);
    const schema=yup.object().shape({
        name:yup.string().min(4).required("Name is required"),
      phone:yup.string().min(11).max(11).required("Phone number is required"),
      userName:yup.string().min(4).required("Username is required or Username needs to be more than 4 characters"),
      password:yup.string().min(8).required("Password is required or password needs to be more than 8characters"),
      pickup:yup.string().min(4).required("Pickup is required or Pickup needs to be more than 4 characters"),
      batchNumber:yup.string().required("batchNumber is required"),
      designation:yup.string().required("designation is required"),
      dept:yup.string().required("Department is required"),
      section:yup.string().required("section is required"),
      time:yup.string().required("Start time is required"),
    }).required();
    const {register,handleSubmit,setError,formState:{errors}} =useForm({resolver: yupResolver(schema)});
    const [time,setTime]=React.useState('');
    const [hide,setHide]=React.useState(true);
    const [name,setName]=React.useState('');
    const [id,setId]=React.useState('');
    const [phone,setPhone]=React.useState('');
    const [userName,setUserName]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [role,setRole]=React.useState('Student');
    const [student,setStudent]=React.useState(true);
    const [teacher,setTeacher]=React.useState(false);
    const [batchNumber,setBatchNumber]=React.useState('');
    const [section,setSection]=React.useState('');
    const [dept,setDept]=React.useState("");
    const [desig,setDesig]=React.useState("");
    const [pickup,setPickUp]=React.useState('');
    const [timeSlot,setTimeSlot]=useState('');
    useEffect(()=>{
      axios.get("https://localhost:7282/TBus/bus-routes",{headers:{
       "Authorization":`Bearer ${localStorage.getItem("token")}`,
     }}).then((data)=>{
       if(data.status===200){
        console.log(data.data);
      setBuses(data.data.data);
      arr1.current=data.data.data;
   setWhat(true);
  }}).catch(err=>
       {
         console.log(err);
      
       });;
   },[])
    const handleChange= (e)=>{
        //  console.log(e);
          const change=e.target.value;
        //  console.log("Abid"+change);
          if(e.target.name==="name")
          setName(change);
          else if(e.target.name==="userName")
          setUserName(change);
        else if(e.target.name==="password")
          setPassword(change);
          else if(e.target.name==="id")
          setId(change);
          else if(e.target.name==="role"){
            if(change.match("Student"))
            {
                setStudent(true);
                setTeacher(false);
                setRole(change);
            }
            else if(change==="Teacher")
            {
                setStudent(false);
                setTeacher(true);
                setRole(change);
            }
         
            else
            {
                setStudent(false);
                setTeacher(false);
                setRole(change);
            }
         
        }
        else if(e.target.name==="routeandtime")
        setTimeSlot(change);
          else if(e.target.name==="pickup"){
         console.log("abid");
          let arr=[];
          if(buses.length===0)
          setBuses(arr1.current);
          for(let i=0;i<buses.length;i++)
          {
            if(buses[i].stoppagePoint.includes(change))
            arr.push(buses[i]);
          }  
          setBuses(arr);
          setPickUp(change);
          
          

         
        }
          else if(e.target.name==="batchNumber")
          setBatchNumber(change);
          else if(e.target.name==="section")
          setSection(change);
          else if(e.target.name==="dept")
          setDept(change);
          else if(e.target.name==="desig")
          setDesig(change);
          else 
          setPhone(change);
        
        }
        const [what,setWhat]=useState(false);
        const [buses,setBuses]=useState([]);
        const [avBuses,setavBuses]=useState([]);
       
    const submit=(e)=> {
        if(role==="Staff"){
      axios.post(`https://localhost:7282/Account/staff`,{
       name,phone,userName,password,id,role,pickup,time:timeSlot
      }).then((data)=>{
       if(data.status===200){
         console.log(data);
         localStorage.setItem("username",data.data.data.userName);
         localStorage.setItem("token",data.data.data.token);
         localStorage.setItem("id",data.data.data.id);
         setName("");
       setUserName("");
       setPassword("");
       setPhone("");
     }}).catch(err=>
       {
         console.log(err);
      
       });
    }
       else if(role==="Student")
       {
        axios.post(`https://localhost:7282/Account/student`,{
            name,phone,userName,password,id,role,pickup,section,batchNumber,time:timeSlot
          }).then((data)=>{
           if(data.status===200){
             console.log(data);
             localStorage.setItem("username",data.data.data.userName);
             localStorage.setItem("token",data.data.data.token);
             localStorage.setItem("id",data.data.data.id);
             setName("");
           setUserName("");
           setPassword("");
           setPhone("");
         }}).catch(err=>
           {
             console.log(err);
          
           });
       }
       else 
       {
        axios.post(`https://localhost:7282/Account/teacher`,{
            fullName:name,contractNumber:phone,userName,password,id,role,pickup,department:dept,designation:desig,time:timeSlot
          }).then((data)=>{
           if(data.status===200){
             console.log(data);
             localStorage.setItem("username",data.data.data.userName);
             localStorage.setItem("token",data.data.data.token);
             localStorage.setItem("id",data.data.data.id);
             setName("");
           setUserName("");
           setPassword("");
           setPhone("");
         }}).catch(err=>
           {
             console.log(err);
          
           });
       }
       
     
      return console.log(e);
    }
return(
    <div className={style.login1}>
  <div className={style.login}>
      <h1>Sign Up</h1>
      <form onSubmit={ handleSubmit(submit)}>
      <input
          type="text"
          name="userName"
          value={userName}
          placeholder="Username"
          required="required"
          {...register('userName')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.userName?.message}</p>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Full Name"
          required="required"
          {...register('name')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.name?.message}</p>
        <input
          type="text"
          name="id"
          value={id}
          placeholder="Student Id"
          required="required"
          {...register('id')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.id?.message}</p>
        <input
          type="text"
         placeholder="Phone"
         value={phone}
          required="required"
          {...register('phone')} 
          onChange={handleChange}
        />
         <p className={style.error}>{errors.phone?.message}</p>
         {student&&<div>
            <input
          type="text"
          name="batchNumber"
          value={batchNumber}
          placeholder="Batch Number"
          required="required"
          {...register('batchNumber')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.batchNumber?.message}</p>
        <input
          type="text"
         placeholder="section"
         value={section}
          required="required"
          {...register('section')} 
          onChange={handleChange}
        />
         
         <p className={style.error}>{errors.section?.message}</p></div>}
         {teacher&&<div>
            <input
          type="text"
          name="designation"
          value={desig}
          placeholder="Designation"
          required="required"
          {...register('designation')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.batchNumber?.message}</p>
        <input
          type="text"
         placeholder="dept"
         value={dept}
          required="required"
          {...register('dept')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.dept?.message}</p></div>}
         <select  {...register("role")} value={role} onChange={handleChange}>
      
      <option value="Student">Student</option>
      <option value="Teacher">Teacher</option>
      <option value="Staff">Staff</option>
  </select>
  {hide&&what&&<div>
    <select  name="routeandtime" value={timeSlot} onChange={handleChange}>
      
    {buses.map((e)=>{
      return(
        
        <option value={e.time}>Route: {e.routeNumber} and Time {e.time}</option>
       
   
      )
    })}
     </select>
    </div>}
  <p className={style.error}>{errors.type?.message}</p>
 
        <p className={style.error}>{errors.userName?.message}</p>
  <input
          type="text"
         placeholder="Pickup Point"
         value={pickup}
          required="required"
          {...register('pickup')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.pickup?.message}</p>
        <input
          type="password"
         placeholder="Password"
         value={password}
          required="required"
          {...register('password')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.password?.message}</p>
        <button type="submit" className={style.btn}>
         SignUp
        </button>
        <NavLink className={style.btn} to="/user/login">
              Login
            </NavLink>
      </form>
    </div>
 </div>
)
}

export default Register;