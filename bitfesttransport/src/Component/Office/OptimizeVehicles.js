import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/optimize.module.css';
 function Optimize() {
  const [hi,setHi]=useState(false)
   const emptySeats=useRef(0);
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
 const [text,setText]=useState("");
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
           let total=parseInt(data.data.data.sthers)+parseInt(data.data.data.staff)+parseInt(data.data.data.students)+parseInt(data.data.data.teachers);
           console.log(total);
           emptySeats.current=total;
         data1.data.sort(function(a, b){return a.capacity-b.capacity});
         console.log(data1.data);
         let capacityTotal=0;
         let arr=[];
         let otherArr=[];
         let y1=0;
         let j=data1.data.length;
         for(let i=0;i<data1.data.length;i++)
         {
         
            let p=parseInt(data1.data[i].capacity);
          
           if(y1+data1.data[i].capacity/3<=total){
           y1+=p;
           arr.push(data1.data[i]);
           }
          else
           {
            j=i;
            break;
           }
          }
            for(let k=j;k<data1.data.length;k++)
            {
                
                otherArr.push(data1.data[k]); 
             }
         setOtherBuses(otherArr);
        if(y1<total)
        setText(`${total-y1} people do not have place to visit by vehicles`);
    
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
   const addBus=(id,capacity,license)=>{
    const result = routes.filter(getStop);
    setHi(true);
    setInterval(()=>{
      setHi(false);
    },5000);

function getStop(rou) {
  return rou.routeNumber===routeName;
}
    console.log(result);
    emptySeats.current-=capacity;
    console.log(typeof emptySeats.current );
   let p=emptySeats.current;
    if(emptySeats.current<0)
    {
     p*=-1;
     axios.post("https://localhost:7282/TBus/add-empty-sit",{
      "routeNumber": routeName,
      "emptySeats": p+"",
      "empty":p+"",
      "time": time,
      "busId": id,
      "license": license,
      "stoppagePoint": result[0].stoppagePoint
    },{headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`,
    }}).then(data=>{
      if(data.status===200)
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
    }
    axios.post("https://localhost:7282/TBus/add-buses-to-route",{
      busId: id,
      "routeNumber": routeName,
      "time":time,
      license,
      capacity,
      stoppagePoint:result[0].stoppagePoint
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
          {hi&&<p style={{fontSize:"130%",backgroundColor:"#4FC3A1",padding:"10px"}}>Bus was added successfully</p>}
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
                        <td><button style={{padding:"0px 20px",backgroundColor:"white"}} onClick={()=> addBus(e.id,e.capacity,e.license,time,routeName)}>Add</button></td>

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
            <h2>{text}</h2>
               </div>}
        </div>
    );
};

export default Optimize;