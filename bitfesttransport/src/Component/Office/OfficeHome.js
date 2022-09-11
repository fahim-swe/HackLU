import React from 'react';
import { NavLink } from 'react-router-dom';
import style from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/css/officehome.module.css';
import bus from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/bus.jpeg';
import route from 'D:/Bitfest/HackLU/bitfesttransport/src/asset/images/route.jpeg';
function OfficeHome()
{

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
    </div>
)
}

export default OfficeHome;