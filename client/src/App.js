import React, { useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar';

function App() {
  
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
}

export default App;
