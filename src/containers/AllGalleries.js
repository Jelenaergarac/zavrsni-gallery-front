import React,{useState, useEffect} from 'react'
import { Redirect, useHistory } from 'react-router'
import GalleryService from '../services/GalleryService'
import { Link } from 'react-router-dom'
import { selectIsAuthenticated, selectActiveUser} from '../store/auth'
import {  useSelector } from 'react-redux'
import Search from '../components/Search'


const AllGalleries = () => {


     const activeUser = useSelector(selectActiveUser)


const history = useHistory()


const [totalPages, setTotalPages] = useState(1);
 
const [page, setPage] = useState(1);
const [galleries, setGalleries] = useState([])
    
const[loading, setLoading] = useState(false)
  const [value, setSearchValue] = useState('');


 


    useEffect(()=> {
        const fetchGalleries = async () => {
        setLoading(true)
        const data = await GalleryService.getGalleries(page,value)
       
        setTotalPages(data.last_page);
        setGalleries([...galleries,...data.data]);
        setLoading(false);
      

           

          }
        fetchGalleries();

    },[page,value])
         
    const deleteGallery = async(id) => {

        const response = prompt(
            "Are you sure you wanna delete this gallery? Type 'yes' if you are"
        )
        if(response !== 'yes'){
            return;
        }

    
                   
        const data = await GalleryService.deleteGallery(id)

       setGalleries(galleries.filter((gallery)=> gallery.id !== id))
       

      history.push('/galleries');

}
  const handleSearchCallback = async (searchValue) => {
    setSearchValue(searchValue);
    setPage(1)

    setLoading(true);
    
    const data = await GalleryService.getGalleries(page, value);
        setTotalPages(data.last_page);
    
    setGalleries(data.data);
    setLoading(false);
  }

	
    return (
        <div className="container">
          
            <h3>All galleries</h3>
            <Search  handleCallback={handleSearchCallback} />

            <div>
              
                     {galleries.map((gallery)=> (
                         <>
                       <Link key={gallery.id} to ={`galleries/${gallery.id}`}>
                     <p><strong>Title</strong> {gallery.title}</p>
                     <Link to={`author/${gallery.user.id}`}>
                     <p> <strong>Author:</strong> {gallery.user.firstname} {gallery.user.lastname} </p>
                     </Link>
                     <p><strong>Description: :</strong>{gallery.description}</p>
                 
            <img style={{ width:"500px" }} src={gallery.images.length ? gallery.images[0].imageUrl : ''}/>
                       </Link>
        
            {activeUser ?
            <p>{activeUser.id === gallery.user.id ?  <button onClick={() => deleteGallery(gallery.id)}>Delete</button> : ''}</p> : ''}
                       
                       <hr/>
              
                       


</>
                               ))}
                                {totalPages !== page && <button  onClick={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</button>}
                      
              
                 
               
            </div>
            


            
        </div>
    )
}


export default AllGalleries
