import React, { useEffect, useState } from 'react'
import { auth, db } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';

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
  return (
    <div className='profile'>
      {userDetails ? (
        <>
        <h3>Welcome {userDetails.firstName}</h3>
        <div>
          <p>Email: {userDetails.email}</p>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
        </div>
        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        </>
      ):(
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile