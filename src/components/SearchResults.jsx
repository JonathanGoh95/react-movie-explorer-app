import { useParams } from "react-router"
import { useNavigate } from "react-router"

import (useParams)

export default function SearchResults({movies, fetchMovieDetails,selectedMovie}) {
    const {imdbID} = useParams()
    const navigate = useNavigate()
    const handleClick = (imdbIDClick) => {
        fetchMovieDetails(imdbIDClick)
        navigate(`/movie/${selectedMovie.imdbID}`)
    }
    
    return(
        <>
        {movies.length === 0 && <h1 class='text-4xl p-5 text-center'>No Movies to Show</h1>}
        <div class='flex flex-wrap justify-center p-10 text-2xl gap-2'>
            {movies.map((movie)=>(
            <div key={movie.imdbID} class="border p-2 cursor-pointer w-1/6" onClick={()=>handleClick(movie.imdbID)}>
                <img src={movie.Poster} alt={movie.Title} class="object-scale-down max-h-full drop-shadow-md rounded-md m-auto" />
                <h2 class="font-bold mt-2">{movie.Title}</h2>
                <p>{movie.Year}</p>
          </div>
            ))}
        </div>
        </>
    )
}