import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';

import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/signup.module.css';
function Login()
{
    const schema=yup.object().shape({
       
      userName:yup.string().min(4).required("Username is required or Username needs to be more than 4 characters"),
      password:yup.string().min(8).required("Password is required or password needs to be more than 8characters")
        
    }).required();
    const {register,handleSubmit,formState:{errors}} =useForm({resolver: yupResolver(schema)})
   
    const [userName,setUserName]=React.useState('');
    const [password,setPassword]=React.useState('');
    const handleChange= (e)=>{
        //  console.log(e);
          const change=e.target.value;
        //  console.log("Abid"+change);
          if(e.target.name==="userName")
          
          setUserName(change);
        else if(e.target.name==="password")
          setPassword(change);
         
        
        }
    const submit=(e)=> {
   
     
       setUserName("");
       setPassword("");
      
       
     
      return console.log(e);
    }
return(
    <div className={style.login1}>
  <div className={style.login}>
      <h1>Login</h1>
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
         Login
        </button>
        <NavLink className={style.btn} to="/office/signup">
              Signup
            </NavLink>
      </form>
    </div>
 </div>
)
}

export default Login;