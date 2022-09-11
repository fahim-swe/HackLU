import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/signup.module.css';
function SignUp()
{
    const schema=yup.object().shape({
        name:yup.string().min(4).required("Name is required"),
      phone:yup.string().min(11).max(11).required("Phone number is required"),
      userName:yup.string().min(4).required("Username is required or Username needs to be more than 4 characters"),
      password:yup.string().min(8).required("Password is required or password needs to be more than 8characters")
        
    }).required();
    const {register,handleSubmit,formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const [name,setName]=React.useState('');
    const [phone,setPhone]=React.useState('');
    const [userName,setUserName]=React.useState('');
    const [password,setPassword]=React.useState('');
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
          else 
          setPhone(change);
        
        }
    const submit=(e)=> {
   
       setName("");
       setUserName("");
       setPassword("");
       setPhone("");
       
     
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
         placeholder="Phone"
         value={phone}
          required="required"
          {...register('phone')} 
          onChange={handleChange}
        />
        <p className={style.error}>{errors.phone?.message}</p>
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
        <NavLink className={style.btn} to="/office/login">
              Login
            </NavLink>
      </form>
    </div>
 </div>
)
}

export default SignUp;