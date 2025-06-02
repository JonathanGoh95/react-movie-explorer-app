import { useState } from 'react'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import SearchPage from './pages/SearchPage'
import * as movieService from './services/movieService'
import './App.css'

export default function App() {
  const [movies,setMovies] = useState([])

  return (
    <div class='text-center'>
      <div class='bg-[url(./images/banner.jpg)] bg-cover text-white'><h1 class="text-6xl font-bold p-8">Movie Explorer</h1></div>
      <NavBar />
      <Routes>
        <Route path='/' element={<h1 class='text-3xl p-5'><span class='font-bold'>Welcome!</span><br/><br/>
        Click on the 'Search for Movies' link to begin searching!<br/><br/>
        Click on the 'Favourite Movies' link to view your favourite movies!
        </h1>}></Route>
        <Route path='/search' element={<SearchPage movies={movies} setMovies={setMovies} />}></Route>
        {/* <Route path='/favourites' element={}></Route> */}
      </Routes>
    </div>
  )

}
