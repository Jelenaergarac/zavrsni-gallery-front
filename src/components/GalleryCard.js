import React from 'react'

const GalleryCard = ({gallery}) => {

    return (
        <div>
            
           <img src={gallery.images.length ? gallery.images[0].imageUrl : ''}/>
            <p>{gallery.title}</p>
            
        </div>
    )
}

export default GalleryCard
