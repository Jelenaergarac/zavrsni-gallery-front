import React,{useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router'
import GalleryCard from '../components/GalleryCard'
import GalleryService from '../services/GalleryService'
import {  selectActiveUser } from "../store/auth";
import { useSelector } from 'react-redux';

const CreateNewGallery = () => {
    const history = useHistory()
    const{id} = useParams()
   
    const [newGallery, setNewGallery] = useState({
      title:'',
      description:'',
      imageUrl:'',
    })
 const activeUser = useSelector(selectActiveUser);
     
 const handleSubmit = async (e) => {
   e.preventDefault();
    let data = null;
    
    if (!activeUser) {
      return ;
    }
    
    if(id) {
      data = await GalleryService.editGallery(id, newGallery);
    } else {
      data = await GalleryService.createNewGallery(newGallery);
    }

    history.push('/my-galleries')
    };




 

    

    return (
           <div>
            <h2>{id ? 'Edit' : 'Add new'} </h2>
            
      <form
     
        onSubmit={handleSubmit}
      >
        <input
          required
          minLength={2}
          value={newGallery.title}
          placeholder='Title'
          onChange={({ target }) =>
          setNewGallery({ ...newGallery, title: target.value })
          }
        />
        <input
          required
          maxLength={1000}
          value={newGallery.description}
          placeholder='descrtiption'
          onChange={({ target }) =>
          setNewGallery({ ...newGallery, description: target.value,  })
          }
        />
      <input 
      type="url" 
      className="form-control" 
      id="imageUrl" placeholder="Image url" 
      value={newGallery.imageUrl} 
      onChange={({target})=> setNewGallery({...newGallery, imageUrl:target.value})} />
      
        
        
<button>{id ? 'Edit' : 'Add'}</button>        
      </form>

      
        </div>
   
   
   )
}

export default CreateNewGallery
