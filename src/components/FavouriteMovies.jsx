import { destroy } from "../services/movieService"

export default function FavouriteMovies({favourites, setFavourites}) {

    const handleDelete = (imdbID) => {
        destroy(imdbID)
        setFavourites(favourites.filter((favourite) => favourite.imdbID !== imdbID))
    }

    return(
    <div className="flex justify-center mt-5 text-3xl">
        {favourites.fields &&
        (favourites.map((favourite) => (
            <div key={favourites.id} className="flex flex-col gap-5 items-center justify-center p-6 border-2 w-1/2 bg-black/15">
                <h2 className="font-bold mb-2">{favourites.fields.Title} ({favourites.fields.Year})</h2>
                <img src={favourites.Poster} alt={favourites.fields.Title} className="border-2 rounded-lg mb-3" />
                <p><strong>Release Date:</strong> {favourites.fields.Released}</p>
                <p><strong>Runtime:</strong> {favourites.fields.Runtime}</p>
                <p><strong>Director(s):</strong> {favourites.fields.Director}</p>
                <p><strong>Writer(s):</strong> {favourites.fields.Writer}</p>
                <p><strong>Actors:</strong> {favourites.fields.Actors}</p>
                <p><strong>Genre(s):</strong> {favourites.fields.Genre}</p>
                <p><strong>IMDb Rating:</strong> {favourites.fields.imdbRating} ⭐</p>
                <p><strong>Plot:</strong> {favourites.fields.Plot}</p>
                <button className='font-bold bg-white border-2 rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer' onClick={() => handleDelete(favourites.fields.imdbID)}>Remove Movie from Favourites</button>
            </div>)
        ))
        }
    </div>
    )
}