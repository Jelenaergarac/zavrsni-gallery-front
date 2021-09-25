import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout, selectActiveUser, selectIsAuthenticated} from '../store/auth'
import { Redirect, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
const Navbar = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const activeUser = useSelector(selectActiveUser)
const history = useHistory()
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
      
    }
    return (
        <div>
       
            <nav >
                 {isAuthenticated ? <h5>Hello {activeUser && activeUser.firstname}</h5> : <h5>Welcome Guest</h5>}            

                <li >
                    <Link to="/galleries">
                        Galleries
                    
                    </Link>
                </li>
                 {isAuthenticated && (
        <h5><Link to="/my-galleries">My Galleries</Link></h5>
      )}
                {isAuthenticated ? (
                <>
                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    <li><Link to="/creategalleries">
                   Add New Gallery
                   </Link></li>
                   
                </>
                   
                ):(
                    <>    
                    <li>
                        <Link to="/login">
                        Login
                        </Link>
                    </li>
                          <li>
                        <Link to="/register">
                        Register
                        </Link>
                    </li>
                 
              
                        
                        </>
                )}
                
            </nav>
        </div>
    )
}

export default Navbar