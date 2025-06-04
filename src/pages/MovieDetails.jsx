import { useNavigate } from "react-router"
import { create } from "../services/movieService"

export default function MovieDetails({selectedMovie, setSelectedMovie, favourites, setFavourites}) {
    const navigate = useNavigate()

    const handleClick = () => {
        setSelectedMovie(null)
        navigate('/search')
    }
    
    const handleFavourites = async () => {
        const favourite = await create(selectedMovie)
        setFavourites([...favourites, favourite])
        navigate('/search')
    }

    return(
        <div className="flex justify-center mt-5 text-3xl">
        {selectedMovie &&
        <div className="flex flex-col gap-5 items-center justify-center p-6 border-2 w-1/2 bg-black/15">
            <h2 className="font-bold mb-2">{selectedMovie.Title} ({selectedMovie.Year})</h2>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="border-2 rounded-lg mb-3" />
            <button className='font-bold bg-white border-2 rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer' onClick={handleFavourites}>Add to Favourite Movies ⭐</button>
            <p><strong>Release Date:</strong> {selectedMovie.Released}</p>
            <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
            <p><strong>Director(s):</strong> {selectedMovie.Director}</p>
            <p><strong>Writer(s):</strong> {selectedMovie.Writer}</p>
            <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
            <p><strong>Genre(s):</strong> {selectedMovie.Genre}</p>
            <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating} ⭐</p>
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
            <button className='font-bold bg-white border-2 rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer' onClick={handleClick}>Back</button>
        </div>}
        </div>
    )
}