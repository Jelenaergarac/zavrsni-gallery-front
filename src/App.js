import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Register from './containers/Register'
import Login from './containers/Login';
import PrivateRoute from './components/shared/PrivateRoute'
import GuestRoute from './components/shared/GuestRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {getActiveUser, selectIsAuthenticated} from './store/auth'
import Navbar from './components/Navbar';
import AllGalleries from './containers/AllGalleries';
import Gallery from './containers/Gallery';
import CreateNewGallery from './containers/CreateNewGallery';
import Pagination from 'react-js-pagination';
import MyGalleries from './containers/MyGalleries';
import store from './store'
import AuthorPage from './containers/AuthorPage'

function App() {


 

  const dispatch = useDispatch();
   const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setTimeout(() => {
        store.dispatch(getActiveUser());
      }, 500);
    }
  }, []);
  return (
    <div className="App">
      <Router>
      

        <Navbar />
     
        
        
        <Switch>
        <GuestRoute exact path="/register">
          <Register/>
</GuestRoute>

          <GuestRoute exact path="/login">
          <Login/>
</GuestRoute>

        <Route exact path="/galleries">
          <AllGalleries/>
 </Route>

        <Route exact path="/galleries/:id">
          <Gallery/>
          </Route>
          
         <Route exact path="/creategalleries">
          <CreateNewGallery/>
          </Route>
                   <Route exact path="/author/:id">
            <AuthorPage />
          </Route>
         <PrivateRoute exact path="/my-galleries" >
            <MyGalleries/>
            </PrivateRoute>

      
         <Route exact path="/edit/:id">
          <CreateNewGallery/>

        </Route>
        
        <Route  path="/">
            <Redirect to="/galleries" />

          </Route>
                 <Route exact path="*">
            <div>Page not found</div>

          </Route>
        
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
