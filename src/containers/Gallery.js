import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router';
import GalleryService from '../services/GalleryService';
import { useHistory } from 'react-router'
import {  useSelector } from 'react-redux'
import { selectIsAuthenticated, selectActiveUser} from '../store/auth'
import AddComment from '../components/AddComment';
import { Link } from 'react-router-dom';
import { Carousel } from "react-bootstrap";

const Gallery = () => {
    const [gallery, setGallery]= useState([]);
    const {id} = useParams()
    const history = useHistory()
     const isAuthenticated = useSelector(selectIsAuthenticated)
     const activeUser = useSelector(selectActiveUser)
     

    const addNewComment = (comment) => {
        setGallery({...gallery, comments:[ ...gallery.comments, comment]});
    }

        
  
    const deleteComment = async(id) => {

        const response = prompt(
            "Are you sure you wanna delete this gallery? Type 'yes' if you are"
        )
        if(response !== 'yes'){
            return;
        }

        await GalleryService.deleteComment(id)
   
       setGallery({...gallery, comments:  gallery.comments.filter((comment)=> comment.id !== id)})


}


    useEffect(()=> {
        const fetchGallery = async () => {
            const data = await GalleryService.getGallery(id);
            setGallery(data);
            
        }
        if(id){
            fetchGallery();
        }
    },[id]);




    return (
        <div>
            <h2>Gallery</h2>
        {gallery.user ? ( <Link to=""> <p>Author: {gallery.user.firstname} {gallery.user.lastname}</p></Link>  
) : 'unknown'}
            <h2>{gallery.title}</h2>
            <p>{gallery.description}</p>

             <div>
             <Carousel>
      {gallery.images && gallery.images.length
          ? gallery.images.map((image, index) => (
              <Carousel.Item key={image.id}>
                <a key={index} target="_blank" rel="noreferrer" href={image.imageUrl}>
                  <img
                  style={{ width:"500px" }}
                    className="single-page--img"
                    src={image.imageUrl}
                    alt={image.imageUrl}
                  />
                </a>
              </Carousel.Item>
            ))
          : "This post dosen't have image"}
      </Carousel>
        </div>
         
            <AddComment
            galleryId={id}

            addNewCommentCallback = {addNewComment}
            />
            <span><strong>Comments:</strong> </span>
               {gallery.comments ? 
      <ul>
        {gallery.comments.map((comment) => (
          <li key={comment.id}>
              <p>User: {comment.user.firstname}</p>
            <p>{comment.textarea}</p>
           {activeUser ?
            <p>{activeUser.id === comment.user.id ?  <button onClick={() => deleteComment(comment.id)}>Delete</button> : ''}</p> : ''}
         
                
            
           
          </li>
        ))}
      </ul> : 'no comments yet'
      }
            
            
        </div>
    )
}

export default Gallery
