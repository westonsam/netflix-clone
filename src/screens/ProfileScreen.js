import React from 'react';
import './ProfileScreen.css';
import Nav from '../Nav';
import { useSelector } from 'react-redux';
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase-handler";

function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <div className='profileScreen'>
      <Nav />
      <div className='profileScreen__body'>
        <h1>Edit Profile</h1>
        <div className='profileScreen__info'>
          <img
            src='https://th.bing.com/th/id/OIP.uDtPlCTKLnrQW_ipwKsCJAHaHa?pid=ImgDet&rs=1'
            alt=''
          />
          <div className='profileScreen__details'>
            <h2>{user.email}</h2>

            <div className='profileScreen__plans'>
              <h3>Plans</h3>
              <button
                className='profileScreen__signOut'
                onClick={() => auth.signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen