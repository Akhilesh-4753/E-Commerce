import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Product_Context } from '../App';

const Home = () => {
const {apiProducts,setApiProducts,apiProductId,setApiProductId} = useContext(Product_Context)

  useEffect(() => {
    axios
    .get('https://dummyjson.com/products')
    .then((i)=>setApiProducts(i.data.products))
  }, [])
  
  const nav = useNavigate();
  const handleApiProductClick = (id) => {
    setApiProductId(id);
    nav('/details')
  }
console.log(apiProductId);
  return (
    <div className='containerr'>
      <div className='product-wrapper'>
      {apiProducts.map((item)=>{  
        return(
          <div>
            <div className='product-card text-center' key={item.id} onClick={ ()=> handleApiProductClick(item.id)}>
                <h3>{item.title}</h3>
                <h6>{item.description.substring(0, 100)}</h6>
                <img style={{height: "100px", width: "auto"}} src={item.images[0]} alt="" />
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Home