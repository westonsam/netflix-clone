import React, { useEffect } from 'react';
import "./App.css";
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { auth } from './firebase-handler';

function App() {
  const user = null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // Logged In
      } else {
        // Logged Out
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
