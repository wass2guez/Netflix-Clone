import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css' 

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      /* math.floor .... >generate random number between 0 and length of array*/
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
   
//   trancate function when you have long text more than n you just put ...
  function truncate(str , n) {
      return str?.length>n ? str.substr(0,n-1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize:
          "cover" /*why ? : is if movie is undefined for any reason it will not crash*/,
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top",
      }}
    >
      <div className="banner_contents">
        {/* if movie title doesnt exist , look for movie name , else ....*/}
        <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className='banner_buttons'>
            <button className='banner_button'>Play</button>
            <button className='banner_button'>My List</button>

        </div>
        <h1 className='banner_desc'>
            {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className='banner-fadebottom'></div>
    </header>
  );
}

export default Banner;
