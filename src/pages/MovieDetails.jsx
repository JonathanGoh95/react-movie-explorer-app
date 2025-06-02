import { useNavigate } from "react-router"

export default function MovieDetails({selectedMovie, setSelectedMovie}) {
    const navigate = useNavigate()

    const handleClick = () => {
        setSelectedMovie(null)
        navigate('/search')
    }

    return(
        <div class="flex justify-center mt-5 text-3xl">
        {selectedMovie &&
        <div class="flex flex-col gap-5 items-center justify-center p-6 border-2 w-1/2">
            {/* <div class="p-4 rounded shadow max-w-lg w-full relative"> */}
                <h2 class="font-bold mb-2">{selectedMovie.Title} ({selectedMovie.Year})</h2>
                <img src={selectedMovie.Poster} alt={selectedMovie.Title} class="border-2 rounded-lg mb-3" />
                <p><strong>Director(s):</strong> {selectedMovie.Director}</p>
                <p><strong>Writer(s):</strong> {selectedMovie.Writer}</p>
                <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                <p><strong>Genre(s):</strong> {selectedMovie.Genre}</p>
                <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating} ⭐</p>
                <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                <button class='font-bold bg-white border-2 rounded-md pt-1 pb-1 pl-3 pr-3 cursor-pointer' onClick={handleClick}>Back</button>
            {/* </div> */}
        </div>}
        </div>
    )
}