import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "./Firebase";
import { setDoc,doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
     await createUserWithEmailAndPassword(auth,email,password);
     const user = auth.currentUser;
     console.log(user);
     if (user){
      await setDoc (doc(db,"Users",user.uid),{
        email: user.email,
        firstName: fname,
        lastName: lname,
        password: password,
      });
     }
     console.log("User Registered Successfully");
     toast.success("User Registered Successfully",{
      position:"top-center"
     });
    } catch (error) {
      console.log(error.message);
      toast.success(error.message,{
        position:"bottom-center"
       });
    }
  } 

  return (
    <div className='background-reg bg'>
      <div className='box'>
      <h1 className='text-center p-4 '>Register</h1>
      <Form className='w-25 m-auto' onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control className='input' type="text" placeholder="Enter First Name" onChange={(e)=>setFname(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control className='input' type="text" placeholder="Enter Last Name" onChange={(e)=>setLname(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control className='input' type="email" placeholder="Enter Mail Address" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control className='input' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Agree to terms" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <h6 className='text-center mt-3 me-5 text-dark'>
        Already have an account?{' '} 
        <b className='text-decoration-underline text-primary'>
          <Link to={'/login'}>Login</Link>
        </b>
      </h6>
      </div>
    </div>
  );
}

export default Register;