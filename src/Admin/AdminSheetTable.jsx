import React, { useContext } from 'react'
import Table from 'react-bootstrap/Table';
import { ObjectArray } from '../Components/ProductsArray'
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from 'react-router-dom';

const AdminSheetTable = () => {

  return (
    <div className='Table-container'>
      <div className='Table-wrapper'>
        <div className='add-item'>
          <button>Add Items</button>
        </div>
    <Table bordered>
    <thead >
      <tr className='align'>
        <th>#</th>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Image</th>
        <th>Rating</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody className='align'>
      {ObjectArray.map((item)=>{
        return(
      <tr>
        <input type="checkbox" className='Cursor'/>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <img style={{height:'100px',width:'auto', objectFit:'contain'}} src={item.image}/>
        <td>{item.rating}</td>
        <td>{item.price}</td>
        <td>{item.stock}</td>
        <td><Link to={`/edit/${item.id}`}><MdModeEdit color='blue' /></Link></td>
        <td><Link><MdDelete color='red' /></Link></td>
      </tr>
        )
      })}
    </tbody>
  </Table>
  </div>
  </div>
);
}

export default AdminSheetTable