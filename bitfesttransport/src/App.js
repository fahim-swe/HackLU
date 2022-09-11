import { Route, Routes } from 'react-router-dom';
import Inventory from './Component/Office/Inventory';
import Login from "./Component/Office/Login";
import AddRoute from './Component/Office/Route';
import SignUp from "./Component/Office/Signup";
import CustomerLogin from './Component/Users/CustomerLogin';
import Register from './Component/Users/Register';

function App() {
  return (
    <div className="App">
    <Routes>
         <Route path="/office/signup" element={<SignUp/>}></Route>
      <Route path="/office/login" element={<Login/>}></Route>
      <Route path="/office/inventory" element={<Inventory/>}></Route>
      <Route path="/office/route" element={<AddRoute/>}></Route>
      <Route path="/user/register" element={<Register/>}></Route>
      <Route path="/user/login" element={<CustomerLogin/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
