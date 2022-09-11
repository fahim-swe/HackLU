import { Route, Routes } from 'react-router-dom';
import Login from "./Component/Office/Login";
import SignUp from "./Component/Office/Signup";

function App() {
  return (
    <div className="App">
    <Routes>
         <Route path="/office/signup" element={<SignUp/>}></Route>
      <Route path="/office/login" element={<Login/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
