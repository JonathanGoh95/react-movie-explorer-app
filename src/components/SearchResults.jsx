import { useNavigate } from "react-router"

export default function SearchResults({movies, fetchMovieDetails,selectedMovie}) {
    const navigate = useNavigate()
    const handleClick = (imdbIDClick) => {
        fetchMovieDetails(imdbIDClick)
        navigate(`/movie/${selectedMovie.imdbID}`)
    }
    
    return(
        <>
        {movies.length === 0 && <h1 class='text-4xl p-8 text-center'>No Movies to Show</h1>}
        <div class='flex flex-wrap justify-center p-10 text-2xl gap-2'>
            {movies.map((movie)=>(
            <div key={movie.imdbID} class="border p-2 cursor-pointer w-1/6" onClick={()=>handleClick(movie.imdbID)}>
                <img src={movie.Poster} alt={movie.Title} class="border-2 rounded-lg object-scale-down max-h-full drop-shadow-md rounded-md m-auto" />
                <h2 class="font-bold mt-2">{movie.Title}</h2>
                <p>{movie.Year}</p>
                <p>Type: {String(movie.Type).charAt(0).toUpperCase() + String(movie.Type).slice(1)}</p>
                
          </div>
            ))}
        </div>
        </>
    )
}