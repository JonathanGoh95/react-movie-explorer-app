import { useState,useEffect } from 'react'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage'
import FavouritesPage from './pages/FavouritesPage'

import * as movieService from './services/movieService'
import './App.css'
import MovieDetails from './pages/MovieDetails'

export default function App() {
  const [movies,setMovies] = useState([])                   // State that stores the results of the movies searched
  const [selectedMovie,setSelectedMovie] = useState(null)   // State that stores the selected movie from the results page
  const [query,setQuery] = useState('')                     // State for holding the query for movie title
  const [movieYear,setMovieYear] = useState('')             // State that adds an additional optional filter for movie release year
  const [selectedPage,setSelectedPage] = useState(1)        // State that determines the current page of the results
  const [favourites,setFavourites] = useState([])           // State that stores the user's favourite movies
  const [loading,setLoading] = useState(false)    // State for the page loading while the API fetches data

  const fetchData = async (query,year,selectedPage) => {             
    const data = await movieService.movies(query,year,selectedPage)
    console.log("Fetched data:", data);
    setMovies(data || [])
  }

  // Function for fetching specific Movie Details
  const fetchMovieDetails = async (imdbID) => {
    const details = await movieService.details(imdbID)
    setSelectedMovie(details)
  }

  // Fetches the Favourites Data from Airtable upon page load
  useEffect(()=>{
    const getFavourites = async () => {
        const data = await movieService.favourites()
        const dataFields = data.records.map((record)=>record.fields)
        setFavourites(dataFields || [])
    }
    getFavourites()
  }, [])
  
  return (
    <div className='text-center'>
      <div className='bg-[url(/images/banner.jpg)] bg-cover text-white'><h1 className="text-6xl font-bold p-8">🎬 Movie Explorer 🎬</h1></div>
      {/* Clears the Movies State whenever the 'Home' link is clicked */}
      <NavBar clearMovies={()=>setMovies([])}/>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/search' element={
          <SearchPage
          movies={movies}
          fetchData={fetchData}
          fetchMovieDetails={fetchMovieDetails}
          query={query}
          setQuery={setQuery}
          movieYear={movieYear}
          setMovieYear={setMovieYear}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          loading={loading}
          setLoading={setLoading}
        />}>
        </Route>
        <Route path='/movie/:imdbID' element={
          <MovieDetails
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          favourites={favourites}
          setFavourites={setFavourites}
          loading={loading}
          selectedPage={selectedPage}
          query={query}
          movieYear={movieYear}
          />}></Route>
        <Route path='/favourites' element={
          <FavouritesPage
          favourites={favourites}
          setFavourites={setFavourites}
          />}></Route>
      </Routes>
    </div>
  )

}
