import { getData } from '../context/userContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user} = getData()
    const token = localStorage.getItem('accessToken')
    
    // Allow access if either user exists in context OR token exists in localStorage
    if (user || token) {
        return children
    }
    
    return <Navigate to={'/login'}/>
}

export default ProtectedRoute