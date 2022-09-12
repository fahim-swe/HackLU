import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/userprofile.module.css';
import bus1 from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/bus.png';
import customer from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/customer.png';
import edit1 from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/edit.png';
import face from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/face.jpg';

function UserProfile()
{
   
    const [type,setType]=useState("Normal");
    const userProfile=useRef();
    const [what,setWhat]=useState(true);
    const [profile,setProfile]=useState(true);
    const [bus,setBus]=useState(false);
    const [req,setReq]=useState(false);
    const [edit,setEdit]=useState(false);
    //const [app,setApp]=useState(false);
    const profileHandler=()=>{
        if(profile===false){
        setProfile(true);
        setEdit(false);
        setBus(false);
        setReq(false);
        }
        
        
    };
    const busHandler=()=>{
        //console.log("HI I am Abid")
        if(bus===false){
            console.log("HI I am Abid")
        setBus(true);
        setEdit(false);
        setProfile(false);
      setReq(false);

        }
    }
    
    const editHandler=()=>{
        //console.log("HI I am Abid")
        if(edit===false){
        setEdit(true);
      setBus(false);
        setProfile(false);
       setReq(false);

        }
    }
      /*  const appHandler=()=>{
            //console.log("HI I am Abid")
            if(edit===false){
            setEdit(false);
           // setOrder(false);
            setProfile(false);
            setApp(true);
    
            }
    };*/
    useEffect(()=>{
       
             
    },[]);
   
/* <div className={styles.profile} onClick={orderHandler}>
                <img  src={order1} alt="Order"></img>
              <h3>Orders</h3>
            </div>
             <div className={styles.profile} onClick={appHandler}>
                <img  src={edit1} alt="Edit"></img>
              <h3>Appointment</h3>
            </div>
             <div className={styles.overview}>
                <div className={styles.totalorder}>
                    <h3>{orders.current[0]}</h3>
                   <div className={styles.insidediv}>
                    <h4>Total Orders</h4>
                    <span>From: 12 Jan 2020</span>
                    <span>To: 20 Nov 2022</span>
                    </div>
                </div>
                <div className={styles.thismonth}>
                    <h3>{orders.current[0]}</h3>
                   <div className={styles.insidediv}>
                    <h4>Monthly Order</h4>
                    <span>From: 12 Jan 2020</span>
                    <span>To: 20 Nov 2022</span>
                    </div>
                </div>
                <div className={styles.totalorder}>
                    <h3 style={{color:"#89E289"}}>{orders.current[1]}</h3>
                   <div className={styles.insidediv}>
                    <h4 style={{color:"#89E289"}}>Appointment</h4>
                    <span>From: 12 Jan 2020</span>
                    <span>To: 20 Nov 2022</span>
                    </div>
                </div>
                <div className={styles.thismonth}>
                    <h3 style={{color:"#66009A"}}>{orders.current[1]}</h3>
                   <div className={styles.insidediv}>
                    <h4 style={{color:"#66009A"}}>Monthly Order</h4>
                    <span>From: 12 Jan 2020</span>
                    <span>To: 20 Nov 2022</span>
                    </div>
                </div>
            </div>
             {order&&<div className={styles.orders}>
               <Orders/>
                </div>}
                {app&&<div className={styles.orders}>
               <AppointmentList></AppointmentList>
                </div>}*/
return(
   <div className={styles.whole}>
    <div className={styles.userprofile}>
      {what&&  
      <div className={styles.item1}>
            <div className={styles.profilepic}>
                <img src={face} alt="Face"></img>
                <h2>{localStorage.getItem("username")}</h2>
                <span>01308376904</span>
            </div>
      
            <div className={styles.profile} onClick={profileHandler}>
                <img  src={customer} alt="Customer"></img>
              <h3>Profile</h3>
            </div>
            <NavLink to="/user/edit"> 

            <div className={styles.profile} onClick={editHandler}>
                <img  src={edit1} alt="Edit"></img>
              <h3>Edit Profile</h3>
            </div>
            </NavLink>
           <NavLink to="/user/busshow"> <div className={styles.profile} onClick={busHandler}>
                <img  src={bus1} alt="Vehicles"></img>
              <h3>Vehicles</h3>
            </div>
            </NavLink>
            <NavLink to="/user/bindedbus"> <div className={styles.profile} onClick={busHandler}>
                <img  src={bus1} alt="Vehicles"></img>
              <h3>Routed Vehicles</h3>
            </div>
            </NavLink>
            <NavLink to="/user/reqseat"> <div className={styles.profile} onClick={busHandler}>
                <img  src={bus1} alt="Vehicles"></img>
              <h3>Request Seat</h3>
            </div>
            </NavLink>
        </div>}
        {what&&  <div className={styles.item2}>
           
           {profile &&<div className={styles.pr}>
            <div className={styles.right}>
            <div className={styles.quotes}>
                <pre style={{fontStyle:"italic",fontFamily:"cursive",textAlign: "center"}}>
                “Some beautiful paths can't be discovered without getting lost.” ― Erol Ozan
                    </pre>
            </div>
           <div className={styles.details}>
                <h2>User Details</h2>
               <div className={styles.detailsdiv}>
                <div className={styles.part1}>
                    <pre>Name&nbsp;&nbsp;&nbsp;             : Abid Ahmed</pre>
                    <pre>Phone&nbsp;&nbsp;&nbsp;            :  01308376904</pre>
                    <pre>Username        :  {localStorage.getItem("username")}</pre>
                </div>
                <div className={styles.part2}>
                  
                    <pre>Batch Number        :  18</pre>
                    <pre>Section                  : B</pre>
                </div>
            </div>
            </div>
            </div>
           
            </div>}
           
        </div>}
        </div>
    </div>
)
}

export default UserProfile;