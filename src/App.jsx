import { useState } from 'react'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage'

import * as movieService from './services/movieService'
import './App.css'
import MovieDetails from './pages/MovieDetails'

export default function App() {
  const [movies,setMovies] = useState([])
  const [selectedMovie,setSelectedMovie] = useState(null)
  const [movieYear,setMovieYear] = useState('')

  const fetchData = async (query) => {
    const data = await movieService.movies(query)
    setMovies(data.Search || [])
  }

  const fetchDataWithYear = async (query,year) => {
    const data = await movieService.moviesYear(query,year)
    setMovies(data.Search || [])
  }

  const fetchMovieDetails = async (imdbID) => {
    const details = await movieService.details(imdbID)
    setSelectedMovie(details)
  }
  
  return (
    <div class='text-center'>
      <div class='bg-[url(./images/banner.jpg)] bg-cover text-white'><h1 class="text-6xl font-bold p-8">🎬 Movie Explorer 🎬</h1></div>
      <NavBar clearMovies={()=>setMovies([])}/>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/search' element={<SearchPage movies={movies} setMovies={setMovies} selectedMovie={selectedMovie} fetchData={fetchData} fetchDataWithYear={fetchDataWithYear} fetchMovieDetails={fetchMovieDetails} movieYear={movieYear} setMovieYear={setMovieYear}/>}></Route>
        <Route path='/movie/:imdbID' element={<MovieDetails selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>}></Route>
        {/* <Route path='/favourites' element={}></Route> */}
      </Routes>
    </div>
  )

}
