import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GalleryService from '../services/GalleryService'
import { selectActiveUser } from '../store/auth'

const MyGalleries = () => {

 const [galleries, setGalleries] = useState([])
    
 const activeUser = useSelector(selectActiveUser)

    useEffect(()=> {
        const fetchMyGallery = async ()=> {
            if(!activeUser){
            return
        }
        const data = await GalleryService.getMyGalleries(activeUser.id)
        setGalleries(data)
        }
        fetchMyGallery()
        
        
        
    },[activeUser])

    
    return (
        <div className="container">
            <div className="row">
            <h1>My Galleries</h1>
            {galleries.length ? (
          <div>   {galleries.map((gallery, index)=> (
                <div key={index}>
                    <span>Title</span>
                    <p>{gallery.title}</p>
                     <span>Description</span>
                    <p>{gallery.description}</p>
                    
                    {gallery.images.length ? <img style={{ width:"500px" }}
            
                src={gallery.images.length ? gallery.images[0].imageUrl : "no photos"}
              />  : "no photos"}
               </div>
                ))}
            </div>
            ): "no galleries"}
           
            <div>

            </div>
         
    
            
        </div>
        </div>
    )
}

export default MyGalleries
