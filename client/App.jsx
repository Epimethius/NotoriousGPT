import React from 'react';
import MainBox from './containers/MainBox.js';
import Login from './containers/Login.js';
import SignUp from './containers/Signup.js';

import {createBrowserRouter, RouterProvider, } from "react-router-dom";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: '/notes',
      element: <MainBox/>,
    },
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/signup',
      element: <SignUp/>
    }
  ]);
  
  
const App = () => (
    <div id = 'app'>
        <RouterProvider router={router} />
    </div>
);

export default App;