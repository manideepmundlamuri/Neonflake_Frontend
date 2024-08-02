import React, { useState } from 'react'
import './Upload.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_URL } from '../data';
const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVedio] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (thumbnail && !['image/jpg', 'image/jpeg', 'image/png'].includes(thumbnail.type)) {
      alert('Invalid thumbnail format. Only JPG and PNG are allowed.');
      return;
    }

    if (video && !['video/avi', 'video/mp4', 'video/mpg', 'video/x-msvideo'].includes(video.type)) {
      alert('Invalid video format. Only AVI, MP4, and MPG are allowed.');
      return;
    }
    
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('thumbnail', thumbnail);
    formdata.append('video', video);
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/upload`, formdata)
      setTitle('')
      setDescription('')
      setThumbnail('')
      setVedio('')
      navigate('/listing')
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
   <div style={{display:'flex',flexDirection:'column'}}>
        <nav style={{display:'flex',justifyContent:'space-evenly',gap:'20px',marginBottom:'20px'}}>
          <Link style={{textDecoration:'none', border:'1px solid ',padding:'10px 20px',cursor:'pointer'}} to="/">Upload</Link>
          <Link style={{textDecoration:'none', border:'1px solid ',padding:'10px 20px',cursor:'pointer'}} to="/listing">Listing</Link>
        </nav>
   
      <div className='form-inputs'>
        <form action="" onSubmit={handleSubmit} >
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id='title' maxLength='50' value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input type="text" id='description' maxLength='200' value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <label htmlFor="thumbnail">Thumbnail</label>
            <input type="file" id='thumbnail'  accept='image/jpg, image/png' onChange={e => setThumbnail(e.target.files[0])} />
          </div>
          <div>
            <label htmlFor="video">Video</label>
            <input type="file" id='video'  accept='video.avi, video/mp4, video/mpg, video/x-msvideo' onChange={e => setVedio(e.target.files[0])} />
          </div>
          <div>
            <button type='submit'>Upload</button>
          </div>
          {loading && <p>Loading...</p>} 
        </form>
      </div>
      </div>
    </>
  )
}

export default Upload

