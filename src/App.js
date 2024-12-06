import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route ,Routes} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from './Components/Firebase'
import "./App.css";
import Header from './Components/Header'
import HomeNew from './Components/HomeNew'
import { ObjectArray } from './Components/ProductsArray'
import ProductDetails from './Components/ProductDetails'
import DataTable from './Admin/AdminSheet'

const Product_Context = createContext();

function App() {
    const [user, setUser] = useState();
    const [arrayProducts, setArrayProducts] = useState([ObjectArray])
    const [arrayProductId, setArrayProductId] = useState(null)
    const [apiProducts, setApiProducts] = useState([]);
    const [apiProductId, setApiProductId] = useState();
    const [filteredProduct, setFilteredProduct] = useState([]);
  console.log(arrayProducts);
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
  }, [])

  return (
    <div>
      <Product_Context.Provider value={{arrayProducts,setArrayProducts,apiProductId,setApiProductId,apiProducts,setApiProducts,arrayProductId,setArrayProductId,filteredProduct,setFilteredProduct}}>
      <BrowserRouter>
      <Header/>
          <Routes>
             <Route path='/' element={user ? <Navigate to="/profile"/> : <Login/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/register' element={<Register/>}/>
             <Route path='/profile' element={<Profile/>}/>
             <Route path='/home' element={<HomeNew/>}/>
             <Route path='/details' element={<ProductDetails/>}/>
             <Route path='/search-results' element={<ProductDetails isSearchResult={true}/>}/>
          </Routes>
              <ToastContainer/>
      </BrowserRouter>
      </Product_Context.Provider>
    </div>
  );
}

export default App;
export {Product_Context}