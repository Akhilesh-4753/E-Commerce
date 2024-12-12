import React, { useContext} from 'react'
import { Product_Context } from '../App'

const ProductDetails = () => {
  const { arrayProducts, arrayProductId } = useContext(Product_Context);

  const selectedProduct = arrayProducts.find((e) => e.id === arrayProductId)
  
  if(!selectedProduct){
    return <div style={{position:'relative', top: '150px', left: '120px'}}>Product not found.....</div>
  }

  return (
    <div className='detail-page-parent'>
      <div className='detail-page-child'>
        <img 
          src={selectedProduct.image} 
          style={{ height: "200px", width: "auto", objectFit: "cover", borderRadius:"15px" }} 
          alt={selectedProduct.title} 
        />
        <h4 className='m-2'>{selectedProduct.price}</h4>
        <p className='text-center w-50 m-auto fs-6'>{selectedProduct.description.substring(0,200) || "No description available"}</p>
        <h6 className='text-end me-4 text-danger'>Stock : {selectedProduct.stock}</h6>
        <button className='btn btn-success mt-3 w-25'>Purchase</button>
        <button className='btn btn-danger mt-3 ms-3'>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductDetails