import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../asset/css/nav.module.css';



//import styles from '../assets/css/specific.module.css';
function Header()
{
  const ref=useRef(null);
  const [search,setSearch]=React.useState("");
  
  
return(
   <nav className={styles.nav}>
     <NavLink to="/home">
     <h3>Transporter</h3>
     </NavLink>
    
      
    <div className={styles.ul}>
     <ul>
       <li className={styles.li}>
       <NavLink end className={({isActive})=> isActive?styles.link:styles.inactive} to='/home' >Home</NavLink>
       </li>
       <li className={styles.li}>
       <NavLink  className={({isActive})=> isActive?styles.link:styles.inactive}to='/user/profile'>Profile</NavLink>
       </li>
       <li className={styles.li}>
       
       </li>
       </ul>
    </div>
      
       </nav>
)
}

export default Header;