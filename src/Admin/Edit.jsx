import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { Product_Context } from '../App';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { arrayProducts,setArrayProducts } = useContext(Product_Context)
  // State to manage form inputs and arrayProducts array
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: '',
    price: '',
    stock: ''
  });

  // Find the item when component mounts
  useEffect(() => {
    // Find the specific item to edit
    const itemToEdit = arrayProducts.find((item) => item.id == id);
    
    if (itemToEdit) {
      // Populate form with existing item data
      setFormData({
        title: itemToEdit.title,
        description: itemToEdit.description,
        rating: itemToEdit.rating.toString(),
        price: itemToEdit.price.toString(),
        stock: itemToEdit.stock.toString()
      });
    } else {
      // Handle case where item is not found
      toast.error('Item not found');
      navigate('/'); // Redirect if item not found
    }
  }, [id, navigate, arrayProducts]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new array with the updated item
    const updatedarrayProducts = arrayProducts.map(product => 
      product.id == id 
        ? {
            ...product,
            title: formData.title,
            description: formData.description,
            rating: parseFloat(formData.rating),
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
          }
        : product
    );
    
    // Update both local state and the imported array
    setArrayProducts(updatedarrayProducts);
    
    // Modify the imported ObjectArray (if needed)
    arrayProducts.splice(0, arrayProducts.length, ...updatedarrayProducts);
    // arrayProducts=[...updatedarrayProducts]
    // Show success toast
    toast.success('Item updated successfully');
    
    // Navigate back to previous page or list
    navigate('/');
  };

  return (
    <div className='Edit-container'>
      <div className='Edit-wrapper'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <h1>ID : {id}</h1>
            
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              name="title"
              value={formData.title} 
              onChange={handleChange}
              required
            />
            
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              name="description"
              value={formData.description} 
              onChange={handleChange}
              required
            />
            
            <Form.Label>Rating</Form.Label>
            <Form.Control 
              type="number" 
              name="rating"
              value={formData.rating} 
              onChange={handleChange}
              step="0.1"
              min="0"
              max="5"
              required
            />
            
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              name="price"
              value={formData.price} 
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
            
            <Form.Label>Stock</Form.Label>
            <Form.Control 
              type="number" 
              name="stock"
              value={formData.stock} 
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Update Item
          </Button>
        </Form> 
      </div>
   </div>
  );
};

export default Edit;