import {useState, useMemo, useEffect} from "react"
import { useNavigate } from "react-router";
import { create, details } from "../services/movieService"
import { ToastContainer, toast } from "react-toastify";

const numGroup = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));      // Slice Pages Array into groups of 10 and put values in a new array
    }
    return result;
}

export default function SearchResults({movies,fetchMovieDetails,pages,selectedPage,setSelectedPage,fetchData,query,movieYear,loading,setLoading,favourites,setFavourites}) {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate()
    const pageGroup = useMemo(() => numGroup(pages, 10), [pages]);     // Only calls the function whenever the pages state array changes, so as to optimize performance

    const handleClick = async (imdbIDClick) => {
        setLoading(true)
        await fetchMovieDetails(imdbIDClick)
        setLoading(false)
        navigate(`/movie/${imdbIDClick}`)
    }

    const handlePageClick = ({target}) => {
        const pageNum = Number(target.value);   // Prevents any invalid/negative numbers to be set as the selectedPage state
        if (!isNaN(pageNum) && pageNum > 0) {
            setSelectedPage(pageNum);
            navigate(`/search/?page=${pageNum}&query=${query}&year=${movieYear}`);    // Directly stores the pageNum variable into the URL instead of state, as it requires time to update to the correct value
        }
    }

    // Incorporates Toastify Notifications to update user on the status of adding a Favourite Movie
    const handleFavourites = async (movie) => {       
        // Checks for Validity/Existence of Fields
        if (!movie || !movie.imdbID) {
            toast.error("Contains invalid movie data. Not added to Favourite Movies.")
            return;
        }
        
        // Checks for Duplicates
        if (favourites.some((fav) => movie.imdbID === fav.imdbID)) {
            toast.info("This movie is already in your Favourite Movies!")
            return;
        }
        
        // Appends the movie to the Favourites State and the Airtable API asynchronously
        try{
            const fullMovie = await details(movie.imdbID);  // Fetches the full movie details from OMDb asynchronously
            await create(fullMovie)                         // Creates a new record in Airtable based on the data retrieved above
            setFavourites([...favourites, fullMovie])       // Sets the local Favourites state accordingly
            toast.success("Movie added to Favourites!")
        }
        catch(error){
            console.error("Failed to add to favourites:", error.message);
        }
    }

    // Fetches API data whenever the page changes
    useEffect(() => {
        if (query) {
            fetchData(query, movieYear, selectedPage);
        }
    }, [selectedPage]);

    // Displays a loading banner while the API fetches the respective data
    if (loading) {
        return <div className="text-center text-4xl p-8">Loading...</div>;
    }

    return(
        <>
        {!movies.Search && <h1 className='text-4xl p-8 text-center'>No Movies to Show</h1>}
        {movies.Search && <div className="flex mt-6 font-bold text-3xl gap-20 justify-center"><h1>Page No.: {selectedPage}</h1><h1>Total Results: {movies.totalResults}</h1></div>}
        <div className='flex flex-wrap justify-center p-10 text-3xl gap-2 w-vw'>
            {movies.Search && movies.Search.map((movie)=>(
            <div key={movie.imdbID} className="border p-2 cursor-pointer w-1/6 bg-black/15" onClick={()=>handleClick(movie.imdbID)}>
                <img src={movie.Poster} alt={movie.Title} className="border-2 rounded-lg object-scale-down max-h-full drop-shadow-md rounded-md m-auto" />
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="font-bold mt-2">{movie.Title}</h2>
                    <p>{movie.Year}</p>
                    <p>Type: {String(movie.Type).charAt(0).toUpperCase() + String(movie.Type).slice(1)}</p>
                    <button className='font-bold bg-white border-2 rounded-md pt-1 pb-1 w-3/4 cursor-pointer' onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering the parent div's onClick
                        handleFavourites(movie);
                    }}>Add to Favourite Movies ⭐</button>
                </div>
            </div>
            ))}
        </div>
        {movies.Search && <>
            <h3 className="text-2xl flex justify-center mb-2 font-bold">Page Number(s):</h3>
            <div className="text-2xl flex justify-center gap-3 mb-4">
                <button
                    className="border-2 px-2 font-bold bg-white rounded-md cursor-pointer"
                    onClick={() => setPageIndex((i) => Math.max(i - 1, 0))}
                    disabled={pageIndex === 0}
                >
                    Prev 10
                </button>
                {pageGroup.length > 0 && pageGroup[pageIndex].map((page) => (
                    <button key={page} value={page} className='cursor-pointer' onClick={handlePageClick}>{page}</button>
                ))}
                <button
                    className="border-2 px-2 font-bold bg-white rounded-md cursor-pointer"
                    onClick={() => setPageIndex((i) => Math.min(i + 1, pageGroup.length - 1))}
                    disabled={pageIndex === pageGroup.length - 1}
                >
                    Next 10
                </button>
            </div>
        </>
        }
        {/* Toastify Container for Visual Customization and Appearance in Browser */}
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
        </>
    )
}