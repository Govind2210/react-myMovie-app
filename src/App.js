import { useEffect, useState } from 'react';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchBox from './Components/SearchBox';
import AddFav from './Components/AddFav';
import RemoveFav from './Components/RemoveFav';


function App() {
  const [movies  ,setMovies] = useState([]);
  const [favourites , setFavorites] = useState([])
  const [searchValue , setSearchValue] =useState('')

  const getMovieRequest = async(searchValue) =>{
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=ac1f4250`
  
    const response = await fetch(url);
    const responseJson = await response.json();

  if(responseJson.Search){
    setMovies(responseJson.Search)
  }
    
  }

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue]);

  // const saveToLocalStorage = (items) =>{
  //   localStorage.setItem('react-movie-app-favourites' , JSON.stringify(item) )
  // }

  const addFavMovies = (movie) =>{
    const newFavList = [...favourites , movie]
    setFavorites(newFavList)
    // saveToLocalStorage(newFavList)

  }

  const removeMovie = (movie) =>{
    const newFavList = favourites.filter(
      (favourites=> favourites.imdbID !== movie.imdbID))
      setFavorites(newFavList)
  }


  return (
    <div className="container-fluid movie-app ">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}  />
      </div>
      <div className='row'>
        <MovieList movies={movies} 
        handleFavouritesClick={addFavMovies} 
        FavComponent={AddFav}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        <MovieList movies={favourites} 
        handleFavouritesClick={removeMovie} 
        FavComponent={RemoveFav}/>
      </div>

    </div>
  );
}

export default App;
