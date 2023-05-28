import React from 'react'

export default function MovieList(props) {
    const FavComponent = props.FavComponent;
  return (
    <div className='image-container  d-flex'>
        {props.movies.map((movie ,index) => <div>
            <img src={movie.Poster} alt='movie'></img>
            <div onClick={()=>props.handleFavouritesClick(movie)} className='overlay d-flex align-items-centre justify-content'>
                <FavComponent/>
            </div>
        </div>)}
    </div>
  )
}
