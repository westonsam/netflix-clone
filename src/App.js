import React, { useEffect } from 'react';
import "./App.css";
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from './firebase-handler';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // Logged In
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged Out
        dispatch(logout);
      }
    })
    // Clean Up function
    return unsubscribe;
  }, []);


  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            {/* <Route path="users/*" element={<Users />} /> */}
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
