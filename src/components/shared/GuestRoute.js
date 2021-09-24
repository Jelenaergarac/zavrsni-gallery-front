import React from 'react'
import { useSelector } from 'react-redux'
import {selectIsAuthenticated} from '../../store/auth'
import { Redirect, Route } from 'react-router'

const GuestRoute = ({children,... props}) => {
    const isGuest = !useSelector(selectIsAuthenticated)
    
    return (
        <Route {...props}>
            {isGuest ? children : <Redirect to="/galleries" />}
            
        </Route>
    )
}

export default GuestRoute