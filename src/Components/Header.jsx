  import React, { useContext, useState } from 'react'
  import { MdAccountCircle } from "react-icons/md"
  import { FaCartShopping } from "react-icons/fa6"
  import { Link, useNavigate } from 'react-router-dom'
  import { Product_Context } from '../App'
  import { ObjectArray } from './ProductsArray'

  const Header = () => {
    const { arrayProducts,setFilteredProduct } = useContext(Product_Context);

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    console.log(ObjectArray);
    const handleSearch = (e) => { 
      e.preventDefault()

      if(searchTerm.trim()){

        const filtered = ObjectArray.filter((product) =>         
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );        
          setFilteredProduct(filtered);
          navigate('/search-results');
          console.log("f :",filtered);
      }
    }

    return (
        <div className='heading'>
        <div className='logo'>
          <h1>SHOPIFY</h1>
        </div>
        <div className='nav-links'>
          <ul>
            <li><Link to={'/home'}>home</Link></li>
            <li><a href="">shops</a></li>
            <select name="collection" id="electronics">
                <option value="collection">Collection</option>
                <option value="saab">Latest</option>
                <option value="mercedes">Popular</option>
                <option value="audi">Trending</option>
            </select>
            <li><a href="">pages</a></li>
            <li><a href="">contact</a></li>
          </ul>
        </div>
          <form className='user' action="" onSubmit={handleSearch}>
          <input type="text" placeholder='search.....' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
          <button className='btn' type='submit'>Search</button>
          <h4><MdAccountCircle /></h4>
          <span><FaCartShopping size={"27px"} /></span>
          </form>
        </div>
    )
  }

  export default Header