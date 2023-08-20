import {
  createBrowserRouter,RouterProvider,Route}from 'react-router-dom'

import Register from './Pages/register/Register'
import Login from './Pages/login/Login';
import Home from './Pages/home/Home';

import './app.scss'
import NavBar from './Components/navbar/NavBar';
import Footer from './Components/footer/Footer';
import Single from './Pages/single/Single';
import WriteNew from './Pages/write/WriteNew';
import { useState } from 'react';



function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element : <>
      <NavBar/>
      <Home/>
      <Footer/>
      </>
    },
    {
      path:"/login",
      element : 
      <>
      <NavBar/>
      <Login/>
      <Footer/>
      </>
    },    
    {
      path:"/register",
      element : 
      <>
      <NavBar/>
      <Register/>
      <Footer/>
      </>
      
    },
    {
      path:"/single/:id",
      element : 
      <>
      <NavBar/>
      <Single/>
      <Footer/>
      </>
    },
    {
      path:"/write",
      element : 
      <>
      <NavBar/>
      <WriteNew/>
      <Footer/>
      </>
    },
  ])

  return (
    <div className="App">
       <div className="app-container">
      <RouterProvider router={router} />
      </div> 

      
    </div>
  );
}

export default App;
