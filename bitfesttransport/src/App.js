
import { Route, Routes } from 'react-router-dom';
import Header from './Component/Navigate';
import AllInventory from './Component/Office/AllInventory';
import AllRoutes from './Component/Office/AllRoutes';
import Inventory from './Component/Office/Inventory';
import Login from "./Component/Office/Login";
import OfficeHome from './Component/Office/OfficeHome';
import Optimize from './Component/Office/OptimizeVehicles';
import AddRoute from './Component/Office/Route';
import SignUp from "./Component/Office/Signup";
import TransportDemand from './Component/Office/TransportDemand';
import BusShowCase from './Component/Users/BusShowcase';
import CustomerLogin from './Component/Users/CustomerLogin';
import EditProfile from './Component/Users/EditProfile';
import Register from './Component/Users/Register';
import RequestSeat from './Component/Users/RequestSeat';
import BusandRoute from './Component/Users/RouteandBus';
import UserProfile from './Component/Users/UserProfile';
function App() {
  return (
    <div className="App">
      <Header/>
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
      <Route path="/user/bindedbus" element={<BusandRoute/>}></Route>
      <Route path="/user/reqseat" element={<RequestSeat/>}></Route>
      <Route path="/user/edit" element={<EditProfile/>}></Route>
      <Route path="/office/transport" element={<TransportDemand/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
