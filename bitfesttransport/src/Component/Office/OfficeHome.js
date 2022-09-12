import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/officehome.module.css';
import binded from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/binded.jpeg';
import bus from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/bus.jpeg';
import trans from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/trans.jpg';

import axios from 'axios';
import route from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/route.jpeg';
function OfficeHome()
{
    useEffect(()=>{
        axios.get("https://localhost:7282/TBus/get-transdemand-path",{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(data=>{
            console.log(data);
        }).catch(e=>{
            console.log(e)
        })
    },[])

return(
    <div className={style.office}>
        
        <div className={style.item}>
        <NavLink to="/office/inventory">
            <img src={bus} alt="Bus Profile"></img>
            <p>Add Vehicle</p>
            </NavLink>
        </div>
        <div className={style.item}>
        <NavLink to="/office/route">
            <img src={route} alt="Route"></img>
            <p>Add Route</p>
            </NavLink>
        </div>
        <div className={style.item}>
        <NavLink to="/office/allroutes">
            <img src={route} alt="Route"></img>
            <p>View Existing Routes</p>
            </NavLink>
        </div>
        <div className={style.item}>
            <NavLink to="/office/allinventory">
            <img src={bus} alt="Bus"></img>
            <p>View Existing Vehicles</p>
            </NavLink>
        </div>
        <div className={style.item}>
        <NavLink to="/office/transport">
            <img src={trans} alt="Route"></img>
            <p>Add Transport Demands</p>
            </NavLink>
        </div>
        <div className={style.item}>
        <NavLink to="/user/bindedbus">
            <img src={binded} alt="Bind"></img>
            <p>Add Route</p>
            </NavLink>
        </div>
        <div className={style.item}>
        <NavLink to="/office/optimize">
            <img src={trans} alt="Route"></img>
            <p>Link Route to Bus</p>
            </NavLink>
        </div>
    </div>
)
}

export default OfficeHome;