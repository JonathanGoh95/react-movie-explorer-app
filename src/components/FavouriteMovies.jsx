import { destroy } from "../services/movieService"

export default function FavouriteMovies({favourites, setFavourites}) {

    const handleDelete = (imdbID) => {
        destroy(imdbID)
        setFavourites(favourites.filter((favourite) => favourite.imdbID !== imdbID))
    }

    return(
    <div className="flex flex-wrap justify-center p-10 text-3xl gap-2 w-vw">
        {favourites.length !== 0 &&
        (favourites.map((favourite) => (
            <div key={favourite.imdbID} className="flex flex-col gap-5 items-center justify-start p-6 border-2 w-1/3 bg-black/15">
                <h2 className="font-bold mb-2">{favourite.Title} ({favourite.Year})</h2>
                <img src={favourite.Poster} alt={favourite.Title} className="border-2 rounded-lg mb-3" />
                <p><strong>Release Date:</strong> {favourite.Released}</p>
                <p><strong>Runtime:</strong> {favourite.Runtime}</p>
                <p><strong>Director(s):</strong> {favourite.Director}</p>
                <p><strong>Writer(s):</strong> {favourite.Writer}</p>
                <p><strong>Actors:</strong> {favourite.Actors}</p>
                <p><strong>Genre(s):</strong> {favourite.Genre}</p>
                <p><strong>IMDb Rating:</strong> {favourite.imdbRating} ⭐
                <span className="ml-6"><strong>Metascore:</strong> {favourite.Metascore} ⭐</span>
                <span className="ml-6"><strong>Rotten Tomatoes:</strong> {favourite.Ratings[1]?.Value || 'N/A'} ⭐</span>
                </p>
                <p><strong>Plot:</strong> {favourite.Plot}</p>
                <button className='font-bold bg-white border-2 rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer' onClick={() => handleDelete(favourite.imdbID)}>Remove Movie from Favourites</button>
            </div>)
        ))
        }
    </div>
    )
}