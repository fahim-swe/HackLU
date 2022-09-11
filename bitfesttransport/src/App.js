
import { Route, Routes } from 'react-router-dom';
import AllInventory from './Component/Office/AllInventory';
import AllRoutes from './Component/Office/AllRoutes';
import Inventory from './Component/Office/Inventory';
import Login from "./Component/Office/Login";
import OfficeHome from './Component/Office/OfficeHome';
import Optimize from './Component/Office/OptimizeVehicles';
import AddRoute from './Component/Office/Route';
import SignUp from "./Component/Office/Signup";
import BusShowCase from './Component/Users/BusShowcase';
import CustomerLogin from './Component/Users/CustomerLogin';
import Register from './Component/Users/Register';
import UserProfile from './Component/Users/UserProfile';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/office/home' element={<OfficeHome/>}></Route>
       <Route path="/office/signup" element={<SignUp/>}></Route>
      <Route path="/office/login" element={<Login/>}></Route>
      <Route path="/office/inventory" element={<Inventory/>}></Route>
      <Route path="/office/route" element={<AddRoute/>}></Route>
      <Route path="/user/register" element={<Register/>}></Route>
      <Route path="/user/login" element={<CustomerLogin/>}></Route>
      <Route path="/user/profile" element={<UserProfile/>}></Route>
      <Route path="/user/busshow" element={<BusShowCase/>}></Route>
      <Route path="/office/optimize" element={<Optimize/>}></Route>
      <Route path="/office/allroutes" element={<AllRoutes/>}></Route>
      <Route path="/office/allinventory" element={<AllInventory/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
