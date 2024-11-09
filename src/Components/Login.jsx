import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from './Firebase';
// import SignInwithGoogle from "./signInWIthGoogle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged in Successfully");
      // window.location.href = "/profile";  we use useNavigate hook instead of this
      toast.success("User Logged in Successfully",{
        position: "top-center", 
      });
      navigate('/profile');
    } catch (error) {
      console.log(error.message);
      
      toast.error(error.message,{
        position: "bottom-center"
      });
    }
  } 

  return (
    <div className='mt-5'>
    <h1 className='text-center'>Login</h1>
    <Form className='w-25 m-auto' onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter Email Address" value={email}
       onChange={(e) => setEmail(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Login
    </Button>
  </Form>
  <div>
  <h6 className='text-center mt-3'>Don't have an account ? {" "}
    <b className='text-decoration-underline text-primary'>
      <Link to={'/register'}>Register here</Link>
    </b>
  </h6>
   </div>
   {/* <SignInwithGoogle/> */}
  </div>
  )
}

export default Login