import { useNavigate } from "react-router"
import { useState,useEffect } from "react";
import { create } from "../services/movieService"
import { ToastContainer, toast } from "react-toastify";

export default function MovieDetails({selectedMovie, setSelectedMovie, favourites, setFavourites,loading,selectedPage}) {
    const [timeToggle,setTimeToggle] = useState(true)
    const [timeFormat,setTimeFormat] = useState('')
    const navigate = useNavigate()
    
    const handleClick = () => {
        setSelectedMovie(null)
        navigate(`/search/?page=${selectedPage}`)
    }
    
    const handleFavourites = async () => {       
        // Checks for Validity/Existence of Fields
        if (!selectedMovie || !selectedMovie.imdbID) {
            toast.error("Contains invalid movie data. Not added to Favourite Movies.")
            return;
        }
        
        // Check for Duplicates
        if (favourites.some((movie) => movie.imdbID === selectedMovie.imdbID)) {
            toast.info("This movie is already in your Favourite Movies!")
            return;
        }
        
        try{
            await create(selectedMovie)
            setFavourites([...favourites, selectedMovie])
            toast.success("Movie added to Favourites!")
        }
        catch(error){
            console.error("Failed to add to favourites:", error.message);
        }
    }

    const handleTimeClick = () => {
        if (selectedMovie.Runtime){
            setTimeToggle(!timeToggle)
            const runtimeMins = selectedMovie.Runtime.split(" ")[0]
            const hr = Math.floor(Number(runtimeMins)/60)
            const min = Number(runtimeMins)%60
            timeToggle ?
            setTimeFormat(hr === 0 ? `${min} mins` :
            hr === 1 ? `${hr} hr ${min} mins` :
            `${hr} hrs ${min} mins`) : setTimeFormat(selectedMovie.Runtime)
        }
    }

    // Loads in the movie's runtime value upon page load
    useEffect(() => {
        if (selectedMovie?.Runtime) {
            setTimeFormat(selectedMovie.Runtime);
        }
    }, [selectedMovie]);

    // Displays a loading banner while the API fetches the respective data
    if (loading) {
        return <div className="text-center text-4xl p-8">Loading...</div>;
    }

    return(
        <div className="flex justify-center mt-5 text-3xl">
        {selectedMovie &&
        <div className="flex flex-col gap-5 items-center justify-center p-6 border-2 w-1/2 bg-black/15">
            <h2 className="font-bold mb-2">{selectedMovie.Title} ({selectedMovie.Year})</h2>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="border-2 rounded-lg mb-3" />
            <button className='font-bold bg-white border-2 rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer' onClick={handleFavourites}>Add to Favourite Movies ⭐</button>
            <p><strong>Rated:</strong> {selectedMovie.Rated}</p>
            <p><strong>Release Date:</strong> {selectedMovie.Released}</p>
            <div className="flex gap-5">
                <p className="mt-2"><strong>Runtime:</strong> {timeFormat}</p>
                <button className='text-2xl p-2 font-bold bg-white border-2 rounded-md cursor-pointer' onClick={handleTimeClick}>Convert Runtime Time Format</button>
            </div>
            <p><strong>Director(s):</strong> {selectedMovie.Director}</p>
            <p><strong>Writer(s):</strong> {selectedMovie.Writer}</p>
            <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
            <p><strong>Genre(s):</strong> {selectedMovie.Genre}</p>
            <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating} ⭐
            <span className="ml-10"><strong>Metascore:</strong> {selectedMovie.Metascore} ⭐</span>
            <span className="ml-10"><strong>Rotten Tomatoes:</strong> {selectedMovie.Ratings[1]?.Value || 'N/A'} ⭐</span>
            </p>
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
            <button className='font-bold bg-white border-2 rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer' onClick={handleClick}>Back</button>
        </div>}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        </div>
    )
}