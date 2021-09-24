import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { selectIsAuthenticated } from '../../store/auth'

const PrivateRoute = ({children, ...props}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    
    return (
        <Route {...props}>
            {isAuthenticated ? children : <Redirect to="/login" />}
            
        </Route>
    )
}

export default PrivateRoute