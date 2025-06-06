import { destroy } from "../services/movieService"
import { useState,useEffect } from "react"

export default function FavouriteMovies({favourites, setFavourites}) {
    const [timeFormats,setTimeFormats] = useState('')     // State that displays the movie runtime

    // Initialize timeFormats when favourites change for each movie in Favourites
    useEffect(() => {
        const initialFormats = {};
        favourites.forEach(fav => {
            initialFormats[fav.imdbID] = fav.Runtime;
        });
        setTimeFormats(initialFormats);
    }, [favourites]);

    // Function for handling the conversion of time format 
    const handleTimeClick = (imdbID, runTime) => {
        setTimeFormats(prev => {
            const current = prev[imdbID];
            let formatted = runTime;
            if (current === runTime) {
                const runtimeMins = runTime.split(" ")[0];
                const hr = Math.floor(Number(runtimeMins) / 60);
                const min = Number(runtimeMins) % 60;
                formatted = hr === 0 ? `${min} mins` :
                            hr === 1 ? `${hr} hr ${min} mins` :
                            `${hr} hrs ${min} mins`;
            }
            return { ...prev, [imdbID]: formatted === current ? runTime : formatted };
        });
    };

    const handleDelete = (imdbID) => {
        destroy(imdbID)
        setFavourites(favourites.filter((favourite) => favourite.imdbID !== imdbID))
    }
    
    return(
    <div className="flex flex-wrap justify-center p-10 text-3xl gap-2 w-vw">
        {favourites.length !== 0 &&
        (favourites.map((favourite) => (
            <div key={favourite.imdbID} className="flex flex-col gap-5 items-center justify-start p-6 border-2 w-9/20 bg-black/15">
                <h2 className="font-bold mb-2">{favourite.Title} ({favourite.Year})</h2>
                <img src={favourite.Poster} alt={favourite.Title} className="border-2 rounded-lg mb-3" />
                <p><strong>Release Date:</strong> {favourite.Released}</p>
                <div className="flex gap-5">
                <p className="mt-2"><strong>Runtime:</strong> {timeFormats[favourite.imdbID] || favourite.Runtime}</p>
                <button className='text-2xl p-2 font-bold bg-white border-2 rounded-md cursor-pointer' onClick={() => handleTimeClick(favourite.imdbID, favourite.Runtime)}>Convert Runtime Time Format</button>
                </div>
                <p><strong>Director(s):</strong> {favourite.Director}</p>
                <p><strong>Writer(s):</strong> {favourite.Writer}</p>
                <p><strong>Actors:</strong> {favourite.Actors}</p>
                <p><strong>Genre(s):</strong> {favourite.Genre}</p>
                <p><strong>IMDb Rating:</strong> {favourite.imdbRating} ⭐
                <span className="ml-6"><strong>Metascore:</strong> {favourite.Metascore} ⭐</span>
                <span className="ml-6"><strong>Rotten Tomatoes:</strong> {favourite.RottenTomatoes || 'N/A'} ⭐</span>
                </p>
                <p><strong>Plot:</strong> {favourite.Plot}</p>
                <button className='font-bold bg-white border-2 rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer' onClick={() => handleDelete(favourite.imdbID)}>Remove Movie from Favourites</button>
            </div>)
        ))
        }
    </div>
    )
}