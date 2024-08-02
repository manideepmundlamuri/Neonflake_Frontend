import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DisplayVideo.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../data';

const DisplayVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/media/${id}`);
        setVideoUrl(response.data.videoUrl);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchVideo();
  }, [id]);

  return (
    <>
      <div style={{display:'flex',flexDirection:'column'}}>
        <nav style={{display:'flex',justifyContent:'space-evenly',gap:'20px',marginBottom:'20px'}}>
          <Link style={{textDecoration:'none', border:'1px solid ',padding:'10px 20px',cursor:'pointer'}} to="/">Upload</Link>
          <Link style={{textDecoration:'none', border:'1px solid ',padding:'10px 20px',cursor:'pointer'}} to="/listing">Listing</Link>
        </nav>
        {videoUrl ? (
          <video controls autoPlay style={{ height: '700px', width: '700px' }} >
            <source src={videoUrl} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>

  );
};

export default DisplayVideo;
