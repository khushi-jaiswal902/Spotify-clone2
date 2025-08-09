import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { albumsData } from '../assets/assets';

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? parseInt(location.pathname.split("/").pop(), 10) : null;

    if (isAlbum && !isNaN(albumId) && albumsData[albumId]) {
      const bgColor = albumsData[albumId].bgColor;
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [location]); // include location to re-run on route change

  return (
    <div
      ref={displayRef}
      className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
