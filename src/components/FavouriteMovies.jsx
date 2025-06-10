import { destroy } from "../services/movieService"
import { useState,useEffect } from "react"

export default function FavouriteMovies({favourites, setFavourites}) {
    // State that displays the movies' runtime
    const [timeFormats,setTimeFormats] = useState('')     
    // States for sorting the Favourites array
    const [sortField, setSortField] = useState("Title");
    const [sortOrder, setSortOrder] = useState("asc");

    // Initialize timeFormats when favourites change for each movie in Favourites
    useEffect(() => {
        const initialFormats = {};
        favourites.forEach(fav => {
            initialFormats[fav.imdbID] = fav.Runtime;
        });
        setTimeFormats(initialFormats);
    }, [favourites]);

    // Function for handling the conversion of the runtime time format 
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

    // Deletes the respective record from the Airtable API
    const handleDelete = (imdbID) => {
        destroy(imdbID)
        setFavourites(favourites.filter((favourite) => favourite.imdbID !== imdbID))
    }

    // Sort favourites based on sortField and sortOrder
    const sortedFavourites = [...favourites].sort((a, b) => {
        let aValue = a[sortField] || "";
        let bValue = b[sortField] || "";

        // If sorting by Year, convert to number
        if (sortField === "Year") {
            aValue = Number(aValue);
            bValue = Number(bValue);
        }

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });
    
    return(
    <>
        {sortedFavourites.length !== 0 &&
        (<div className="flex items-start justify-center gap-5 text-2xl">
            <div className="flex gap-2">
                <label className="font-bold" htmlFor="sort">Sort by: </label>
                <select className="pt-1" id="sort" value={sortField} onChange={e => setSortField(e.target.value)}>
                    <option value='Title'>Movie Title</option>
                    <option value='Year'>Release Year</option>
                </select>
            </div>
            <div className="flex gap-2">
                <label className="font-bold" htmlFor="order">Order: </label>
                <select className="pt-1" id="order" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value='asc'>Ascending</option>
                    <option value='des'>Descending</option>
                </select>
            </div>
        </div>)}
        
        <div className="flex flex-wrap justify-center p-10 text-3xl gap-2 w-full">
            {sortedFavourites.length !== 0 &&
            (sortedFavourites.map((favourite) => (
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
    </>
    )
}