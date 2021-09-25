import React,{useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router'
import GalleryCard from '../components/GalleryCard'
import GalleryService from '../services/GalleryService'
import {  selectActiveUser } from "../store/auth";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CreateNewGallery = () => {
    const history = useHistory()
    const{id} = useParams()
   
    const [newGallery, setNewGallery] = useState({
      title:'',
      description:'',
      imageUrl:'',
    })
 const activeUser = useSelector(selectActiveUser);
   const [imageList, setImageList] = useState([{}])

   useEffect(()=>{
     const fetchGallery = async ()=>{
       const{id:_, created_at, ...data} = await GalleryService.getGallery(id)
       setNewGallery({data, imageUrl: data.images.imageUrl})
     }
     if(id){
       fetchGallery()
     }
   },[id])

 const handleSubmit = async (e) => {
   e.preventDefault();
    let data = null;
    
    if (!activeUser) {
      return ;
    }
    newGallery.images = imageList.map((image)=> (
      image.imageUrl
    ))
    
  
      data = await GalleryService.createNewGallery(newGallery);
    

    history.push('/my-galleries')
    };
    const handleInput = (e, index) => {
      const { name, value } = e.target
      const list = [...imageList]
      list[index][name] = value

      setImageList(list)
    }

    const addOnClick = () => {
      setImageList([...imageList,{imageUrl:''}])
    }

    const removeOnClick =(index)=> {
      const list = [...imageList]
      list.splice(index, 1)
      setImageList(list)

    }
    const handleCancel = () => {
      history.push('/my-galleries')
    }





 

    

    return (
           <div className="row justify-content-center ">
             <div className="col-md-3 shadow-lg p-3 mb-5 bg-white rounded">
            <h2>Add New Gallery</h2>
            
      <form
     
        onSubmit={handleSubmit}
      >
        <input
         className="form-control"
          required
          minLength={2}
          value={newGallery.title}
          placeholder='Title'
          id="title"
          onChange={({ target }) =>
          setNewGallery({ ...newGallery, title: target.value })
          }
        />
        <input
         className="form-control"
          required
          maxLength={1000}
          value={newGallery.description}
          placeholder='descrtiption'
          onChange={({ target }) =>
          setNewGallery({ ...newGallery, description: target.value,  })
          }
        />
     {imageList.map((x, i) => (
        <div key={i} className="form-group">
       
          <input 
           className="form-control"
          type="url" 
           id="imageUrl"
            name="imageUrl"
             placeholder="Image url"
              value={x.imageUrl}
               onChange={e => handleInput(e, i)} />
          <div>
            {imageList.length !== 1 && <button className="btn btn-success"
              className="mr10"
              onClick={() => removeOnClick(i)}>Remove</button>}
            {imageList.length - 1 === i && <button className="btn btn-success" onClick={addOnClick}>Add</button>}
          </div>
        </div>))}
        
        
<button className="btn btn-success">Add Gallery</button>        
<button className="btn btn-success" onClick={handleCancel}>Cancel</button>
      </form>
</div>
      
        </div>
   
   
   )
}

export default CreateNewGallery
