import React, { useEffect, useState } from 'react'
import './Listing.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../data';
const Listing = () => {
  const [ mediaList , setMediaList] = useState([]);

  useEffect(()=>{
    const fetchMedia = async ()=>{
      const response = await axios.get(`${API_URL}/api/media`);
      setMediaList(response.data);
    }
    fetchMedia();
  },[])

  return (
   <>
   <div style={{display:'flex',flexDirection:'column'}}>
        <nav style={{display:'flex',justifyContent:'space-evenly',gap:'20px',marginBottom:'20px'}}>
          <Link style={{textDecoration:'none', border:'1px solid ',padding:'10px 20px',cursor:'pointer'}} to="/">Upload</Link>
          <Link style={{textDecoration:'none', border:'1px solid ',padding:'10px 20px',cursor:'pointer'}} to="/listing">Listing</Link>
        </nav>
   <div style={{display:'grid',flexDirection:'column',gridTemplateColumns:"repeat(4,1fr)",gap:'10px',gridAutoRows:'monmax(100px,auto)'}}>
    {mediaList.map((media)=>(
      <div key={media._id} >
        <Link style={{textDecoration:'none'}} to={`/video/${media._id}`}>
        <img style={{height:'300px',width:'300px'}} src={media.thumbnailUrl}  alt={media.title} />
        <h3 style={{marginTop:'4px',textAlign:'center'}} >{media.title}</h3>
        <p style={{marginTop:'1px',textAlign:'center'}}>{media.description}</p>
        </Link>
      </div>
    ))}
   </div>
   </div>
   </>
  )
}

export default Listing
