import React from 'react';
import "./App.css";
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          {/* <Route path="users/*" element={<Users />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
