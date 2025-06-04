import { destroy } from "../services/movieService"

export default function FavouriteMovies({favourites, setFavourites}) {

    const handleDelete = (imdbID) => {
        destroy(imdbID)
        setFavourites(favourites.filter((favourite) => favourite.imdbID !== imdbID))
    }

    <div className="flex justify-center mt-5 text-3xl">
        {favourites.length !== 0 &&
        <div className="flex flex-col gap-5 items-center justify-center p-6 border-2 w-1/2 bg-black/15">
            <h2 className="font-bold mb-2">{favourites.Title} ({favourites.Year})</h2>
            <img src={favourites.Poster} alt={favourites.Title} className="border-2 rounded-lg mb-3" />
            <p><strong>Release Date:</strong> {favourites.Released}</p>
            <p><strong>Runtime:</strong> {favourites.Runtime}</p>
            <p><strong>Director(s):</strong> {favourites.Director}</p>
            <p><strong>Writer(s):</strong> {favourites.Writer}</p>
            <p><strong>Actors:</strong> {favourites.Actors}</p>
            <p><strong>Genre(s):</strong> {favourites.Genre}</p>
            <p><strong>IMDb Rating:</strong> {favourites.imdbRating} ⭐</p>
            <p><strong>Plot:</strong> {favourites.Plot}</p>
            <button className='font-bold bg-white border-2 rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer' onClick={() => handleDelete(favourites.imdbID)}>Remove Movie from Favourites</button>
        </div>}
        </div>
}