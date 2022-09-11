import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/optimize.module.css';
 function Optimize() {
   
    const [point,setPoint] = useState([]);
    const [what, setWhat] = useState(false);
  const [buses, setBuses] = useState([]);
  const [otherBuses,setOtherBuses]=useState([]);
  const [routes,setRoutes]=useState([]);
  const schema=yup.object().shape({
       
    time:yup.string().required("Time is required"),
    routeName:yup.string().required("Route Number is required ")
      
  }).required();
  const {register,handleSubmit,formState:{errors}} =useForm({resolver: yupResolver(schema)})
 const [inp,setInp]=useState(true);
  const [time,setTime]=React.useState('');
  const [routeName,setRouteName]=React.useState('');
  const handleChange= (e)=>{
      //  console.log(e);
        const change=e.target.value;
      //  console.log("Abid"+change);
        if(e.target.name==="time")
        
        setTime(change);
      else 
        setRouteName(change);
       
      
      }
   // const [avBuses, setavBuses] = useState([]);
   /* useEffect(() => {
        axios.get("https://localhost:7282/TBus/bus-routes", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((data) => {
            if (data.status === 200) {
                console.log(data.data);
                //setBuses(data.data);
                const map1 = new Map();

                for(let i=0;i<data.data.length;i++)
                {
                    console.log(data.data[i].time+" "+data.data[i].stoppagePoint);
                    if(data.data[i].time.includes(time))
                    {
                     for(let j=0;j<point.length;j++){
                        if(data.data[i].stoppagePoint.includes(point[j]))
                     var y=map1.get("Route"+i);
                     if(y===null||y===undefined)
                      map1.set("Route"+i,1);
                      else
                      map1.set("Route"+i,y+1);
                       break;
                     }
                    }

                }
                console.log(map1);
                setBuses(map1);
               setWhat(true);
            }
        }).catch(err => {
            console.log(err);

        });;
    }, []);*/
   // const [buses,setBuses]=useState([]);
    const [avBuses,setavBuses]=useState([]);
    useEffect(()=>{
       axios.get("https://localhost:7282/TBus/bus-routes",{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then((data)=>{
        if(data.status===200){
         console.log(data.data);
       setRoutes(data.data.data);
  //  setWhat(true);
   }}).catch(err=>
        {
          console.log(err);
       
        });;
    },[])
    const submit=(e)=> {
  axios.post("https://localhost:7282/TBus/number-of-passengers",{time,routeName},{headers:{
    "Authorization":`Bearer ${localStorage.getItem("token")}`,
  }}).then(data=>{
    if(data.status===200)
    {
      console.log(data);
      axios.get("https://localhost:7282/TBus/avaiable-bus",{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then((data1)=>{
        if(data1.status===200){
          console.log(data.data.data.staff);
          /*  let total=parseInt(data.data.data.sthers)+parseInt(data.data.data.staff)+parseInt(data.data.data.students)+parseInt(data.data.data.teachers);*/
          let total=20;
         
         console.log(total);
         let capacityTotal=0;
         let arr=[];
         let otherArr=[];
         for(let i=0;i<data1.data.length;i++)
         {
         
            let p=parseInt(data1.data[i].capacity);
          
           if(total+15>=0){
            total-=p;
           arr.push(data1.data[i]);
           }
           else
           {
            for(let j=i;j<data1.data.length;j++)
            {
                if(data1.data[j].capacity<=total)
                arr.push(data1.data[j]);
                else
                otherArr.push(data1.data[j]);

            }
            break;
           }
         }
         setOtherBuses(otherArr);
        
    
         setInp(false);
       setBuses(arr);
       console.log(arr);
         setWhat(true);
     
      }}).catch(err=>
        {
          console.log(err);
       
        });;  
   



    }
  })
            
    
     return console.log(e);
   }
   const addBus=(id)=>{
    console.log(id);
    axios.post("https://localhost:7282/TBus/add-buses-to-route",{
      busId: id,
      "routeNumber": routeName,
      "time":time
    },{headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`,
    }}).then(data=>{
      if(data.status===200)
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
   }
    
  
    return (
        <div className={styles.optimize}>
          {inp&&<form onSubmit={ handleSubmit(submit)}>
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
            {what&&<div>
              <h2>Suggested buses for the time slot :{time} and route number: {routeName}</h2>
              {
                <table className={styles.table}>
                <thead>
              <tr>
                <th>Buses</th>
                <th>License Number</th>
                <th>Capacity</th>
                <th>Driver Name</th>
                <th>Add Bus</th>
                </tr>
                </thead>
              <tbody>
                {buses.map((e)=>{
                    return (
                        <tr>
                        <td >{e.id}</td>
                        <td >{e.license}</td>
                        <td >{e.capacity}</td>
                        <td>{e.driverName}</td>
                        <td><button style={{padding:"0px 20px",backgroundColor:"white"}} onClick={()=> addBus(e.id,time,routeName)}>Add</button></td>

                      </tr>
                    )
                })}
             
              
              </tbody>
            </table>
            
               
                }
                <h2>Other buses</h2>
                  <table className={styles.table}>
                <thead>
              <tr>
                <th>Buses</th>
                <th>License Number</th>
                <th>Capacity</th>
                <th>Driver Name</th>
                <th>Add Bus</th>
                </tr>
                </thead>
              <tbody>
                {otherBuses.map((e)=>{
                    return (
                        <tr>
                        <td >{e.id}</td>
                        <td >{e.license}</td>
                        <td >{e.capacity}</td>
                        <td>{e.driverName}</td>
                        <td><button style={{padding:"0px 20px",backgroundColor:"white"}} onClick={()=> addBus(e.id,time,routeName)}>Add</button></td>

                      </tr>
                    )
                })}
             
              
              </tbody>
            </table>
            
               </div>}
        </div>
    );
};

export default Optimize;