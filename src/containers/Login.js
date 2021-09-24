import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import {login} from '../store/auth'
import { Link } from 'react-router-dom'



const Login = () => {
    const history = useHistory()
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  

    const dispatch = useDispatch()
    const[credentials, setCredentials] = useState({
        email:'',
        password:'',
    })

    // const handleLogin = (e) => {
    //     e.preventDefault()
       
    //     alert('you logged in successfully!')
      


    // }
    const handleSubmit = (e) => {
    e.preventDefault();
   
       
     (dispatch(login(credentials)))
           history.push('/galleries')
    
};



    return (
        <div>
            <h2>Login</h2>
             <div className="row justify-content-center ">
                <div className="col-md-3 shadow-lg p-3 mb-5 bg-white rounded">
     
            <form onSubmit={handleSubmit}>
            <input
            className="form-control"
            type="email"
            required
            placeholder="Email"
            value={credentials.email}
            onChange={({target})=> setCredentials({...credentials, email: target.value})}
            
            />
          
            <input
            className="form-control"
            required
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={({target})=> setCredentials({...credentials, password: target.value})}
            />
            <button className="btn btn-success">Submit</button>
             <div>
                  <Link to="/register">Are you new here?</Link>
              </div>
            
            </form>
            </div>
            </div>
        </div>
    )
}

export default Login
