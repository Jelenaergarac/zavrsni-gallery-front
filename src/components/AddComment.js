import React, { useState } from 'react'
import GalleryService from '../services/GalleryService';
import {  useSelector } from 'react-redux'
import { selectIsAuthenticated} from '../store/auth'


const AddComment = ({galleryId, addNewCommentCallback}) => {
     const isAuthenticated = useSelector(selectIsAuthenticated)
    

    const [newComment, setNewComment] = useState({textarea:''})

    const addComment = async(e)=> {
        e.preventDefault();
        const data = await GalleryService.addComment(newComment, galleryId)
        console.log(data)
        if(data){
            addNewCommentCallback(data)
        }
        setNewComment({textarea:''})

    }
    return (
        <div>
           
                   <form onSubmit={addComment}>
                <input
                type="text"
                value={newComment.textarea}
                onChange={({target})=> setNewComment({...newComment, textarea:target.value})}
                />
              
                <button>Add Comment</button>
            </form>
      
            
            
         
            
        </div>
    )
}

export default AddComment
