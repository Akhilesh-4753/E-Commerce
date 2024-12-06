import React, { useEffect, useState } from 'react'
import { auth, db } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not Logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User Logout Successfully !")
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  } 

  const nav = useNavigate();
  const homepage = () => {
    nav("/home");
  }
  return (
    <div className='background-prf bg'>
    <div className='profile'>
      {userDetails ? (
        <>
        <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
        <div>
          <p>Email: {userDetails.email}</p>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
        </div>
        <div className='button'>
        <button className='btn btn-success' onClick={homepage}>Home Page</button>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>       
        </div>
        </>
      ):(
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
}

export default Profile