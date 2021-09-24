import HttpService from "./HttpService";

class GalleryService extends HttpService {
  
    getGalleries = async (number=1) => {
        const {data} = await this.client.get(`/galleries?page=${number}`)
        return data;
        
       
    }

    getGallery = async (id) => {
        const {data} = await this.client.get(`/galleries/${id}`)
        return data;
    }
    createNewGallery = async(newGallery) => {
        const {data} = await this.client.post('/creategalleries', newGallery)
        return data;
    }
    editGallery = async (id, gallery) => {
        try{
            const {data} = await this.client.put(`galleries/${id}`, gallery)
             return data;
        }catch(error){
            console.log(error)
        }
        return null;
    }
    deleteGallery = async (id) => {
        try{
            const {data} = await this.client.delete(`galleries/${id}`)
             return data;
        }catch(error){
            console.log(error);
        }
        return null;
    }
      deleteComment = async (id) => {
        try{
            const {data} = await this.client.delete(`comments/${id}`)
             return data;
        }catch(error){
            console.log(error);
        }
        return null;
    }
    addComment = async(comment, galleryId) =>{
        try{
            const {data} = await this.client.post(`galleries/${galleryId}/comments`, comment);
            return data;

        }catch(error){
            console.log(error);
        }
        return null;
    }
    

    getMyGalleries = async(id)=> {
        const {data} = await this.client.get(`/my-galleries/${id}`)
        return data;
    }
}

export default new GalleryService()