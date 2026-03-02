import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './../components/Hero'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import VerifyEmail from '../Pages/VerifyEmail'
import Verify from '../Pages/Verify'
import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute'
import ForgotPassword from '../Pages/ForgotPassword'
import VerifyOTP from '../Pages/VerifyOtp'
import ChangePassword from '../Pages/ChangePassword'
import AuthSuccess from '../Pages/AuthSuccess'

const router = createBrowserRouter([
  {
    path: '/Home',
    element: <ProtectedRoute><><Navbar /><Home /></></ProtectedRoute>
},
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/verify',
    element:<VerifyEmail/>
  },
  {
    path:'/verify/:token',
    element:<Verify/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/auth-success',
    element:<AuthSuccess/>
  },
  {
    path:'/forgot-password',
    element:<ForgotPassword/>
  },
  {
    path:'/verify-otp/:email',
    element:<VerifyOTP/>
  },
  {
    path:'/change-password/:email',
    element:<ChangePassword/>
  },
  
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App