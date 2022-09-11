import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/signup.module.css';
function Register()
{
    const schema=yup.object().shape({
        name:yup.string().min(4).required("Name is required"),
      phone:yup.string().min(11).max(11).required("Phone number is required"),
      userName:yup.string().min(4).required("Username is required or Username needs to be more than 4 characters"),
      password:yup.string().min(8).required("Password is required or password needs to be more than 8characters"),
      pickup:yup.string().min(4).required("Pickup is required or Pickup needs to be more than 4 characters"),
        
    }).required();
    const {register,handleSubmit,setError,formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const [name,setName]=React.useState('');
    const [id,setId]=React.useState('');
    const [phone,setPhone]=React.useState('');
    const [userName,setUserName]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [role,setRole]=React.useState('Student');
    const [pickup,setPickUp]=React.useState('');
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
          else if(e.target.name==="role")
          setRole(change);
          else if(e.target.name==="pickup")
          setPickUp(change);
          else 
          setPhone(change);
        
        }
    const submit=(e)=> {
      axios.post("http://localhost:7282/Account/register",{
        fullName:name,contractNumber:phone,userName,password,id,role,pickup
      }).then((data)=>{
       if(data.status===200){
         console.log(data);
         setName("");
       setUserName("");
       setPassword("");
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
         <select  {...register("role")} value={role} onChange={handleChange}>
      
      <option value="Student">Student</option>
      <option value="Teacher">Teacher</option>
      <option value="Staff">Staff</option>
  </select>
  <p className={style.error}>{errors.type?.message}</p>
  <input
          type="text"
         placeholder="Pickup Point"
         value={pickup}
          required="required"
          {...register('password')} 
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