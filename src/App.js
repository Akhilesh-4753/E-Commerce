import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route ,Routes} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from './Components/Firebase'
import "./App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
  }, [])

  return (
    <div>
      <BrowserRouter>
      {/* <div className='App'> */}
        <div className='auth-wrapper'>
          <div className='auth-inner'>
          <Routes>
             <Route path='/' element={user ? <Navigate to="/profile"/> : <Login/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/register' element={<Register/>}/>
             <Route path='/profile' element={<Profile/>}/>
          </Routes>
              <ToastContainer/>
          </div>
        </div>
      {/* </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
