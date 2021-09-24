import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import {register} from '../store/auth'


const Register = () => {
    
      
    const dispatch = useDispatch()
    const history = useHistory()
    const[userData, setUserData] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        password_confirmation:'',
        terms:false

    })

    

    const registerSubmit = (e) => {
      
       
        e.preventDefault()
        let error = ''
      
    
       
     
        dispatch(register(userData))
        if(userData.password !== userData.password_confirmation ){
          alert("Please, confirm your password correctly!" )
         return
        }
        const regex = /[0-9]/;
        if(!regex.test(userData.password)){
            alert("Please, insert at least one number")
            return
        }
        if(userData.password.length < 8 ){
            alert("Sorry, your password must contain 8 characters!")
            return;
        }
        if(userData.password.length >255){
            alert("Too many characters!")
            return;
        }
        if(!userData.terms){
            alert("You must accept terms if you want to proceed!")
        }
       
         
   
       
      history.push('/galleries')
    }


    return (
        <div>
            <div className="row justify-content-center ">
                <div className="col-md-7 shadow-lg p-3 mb-5 bg-white rounded">
            <h2 >Register</h2>
            <form onSubmit={registerSubmit}>
                <input
                className="form-control"
                required
                type="text"
                placeholder="firstname"
                value={userData.firstname}
                onChange={({target})=> setUserData({...userData, firstname:target.value })}
                />
                
               
                 <input
                 className="form-control"
                required
                type="text"
                placeholder="Lastname"
                value={userData.lastname}
                onChange={({target})=> setUserData({...userData, lastname:target.value })}
                />
                 <input
                 className="form-control"
                required
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={({target})=> setUserData({...userData, email:target.value })}
                />
                 <input
                 className="form-control"
                required
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={({target})=> setUserData({...userData, password:target.value })}
                />
                 <input
                 className="form-control"
                required
                type="password"
                placeholder="Confirm password"
                value={userData.password_confirmation}
                onChange={({target})=> setUserData({...userData, password_confirmation:target.value })}
                />
                <span className="form-check">
                   
                 <input
               className="form-check-input"
                required
                type="checkbox"   
                 checked={userData.terms}    
                 onChange={({target})=> setUserData({...userData, terms:target.checked})} 
                />
                 <label className="form-check-label">Terms and Conditions</label>
                </span>
              <button className="btn btn-success">Submit</button>
              <div>
                  <Link to="/login">You already have an account? Please, login</Link>
              </div>

            </form>
            </div>
            </div>
        </div>
    )
}

export default Register
