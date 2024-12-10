import React, { useContext } from 'react'
import { Product_Context } from '../App.js'
import { useNavigate } from 'react-router-dom'

const HomeNew = ( {isSearchResult = false} ) => {
  const {arrayProducts, setArrayProductId, filteredProduct} = useContext(Product_Context)

  const nav = useNavigate();
  const arrayProductClick = (id) => {
    setArrayProductId(id);
    nav('/details')
  }
  const displayProduct = isSearchResult ? filteredProduct : arrayProducts;
  
  return (
    <div className='containerr'>
      <div className='product-wrapper'>
      {displayProduct.map((item)=>{
        return(
          <div className='product-card text-center' key={item.id} onClick={ ()=> arrayProductClick(item.id)}>
             <h3>{item.title}</h3>
             <h6>{item.description.substring(0,100)}</h6>
             <img
                style={{
                height: '100px',
                width: 'auto',
                objectFit: 'contain',
             }}
               src={item.image}
               alt={item.title}
              />
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default HomeNew






// {ProductDetailed[0].map((item)=> ivide 0 nte ullil ahhnn product details ullath . so [0] use cheyyunnu