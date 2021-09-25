import React,{useEffect, useState} from 'react'
import UserService from '../services/UserService';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import GalleryService from '../services/GalleryService';
const AuthorPage = () => {
 const [authors, setAuthors] = useState([]);
  const { id } = useParams();
  const [galleries, setGalleries] = useState([])

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await GalleryService.getMyGalleries(id);
  
      
      setAuthors(data);
    }

    fetchAuthor();
  }, [id])

  return (
    <div>
    <div>
            <h2>Author galleries</h2>
           {authors.length ? (
 <div>
              {authors.map((gallery) => (
                <div key={gallery.id}>
                    <div>
                      
                    <p>{gallery.title}</p>
                     <p>{gallery.description}</p>
                    
                      
            <strong>Description:</strong> 
            <p>{gallery.description}</p>
          

            {gallery.images.length ? <img
                style={{width:"500px"}}
                src={gallery.images.length ? gallery.images[0].imageUrl : 'no photos'}
              />  : "no galleries"}
            </div>
                
            </div>)
            )}
           </div>
           ) : "no galleris"}
          
           

        </div>
     
    </div>
  )

}

export default AuthorPage
