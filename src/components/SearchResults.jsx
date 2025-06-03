import {useState, useMemo, useEffect} from "react"
import { useNavigate } from "react-router";

const numGroup = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));      // Slice Pages Array into groups of 10 and put values in a new array
    }
    return result;
}

export default function SearchResults({movies,fetchMovieDetails,pages,selectedPage,setSelectedPage,fetchData,query,movieYear}) {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate()
    const pageGroup = useMemo(() => numGroup(pages, 10), [pages]);     // Only calls the function whenever the pages state array, so as to optimize performance

    const handleClick = (imdbIDClick) => {
        fetchMovieDetails(imdbIDClick)
        navigate(`/movie/${imdbIDClick}`)
    }

    const handlePageClick = ({target}) => {
        const pageNum = Number(target.value);   // Prevents any invalid/negative numbers to be set as the selectedPage state
        if (!isNaN(pageNum) && pageNum > 0) {
            setSelectedPage(pageNum);
        }
    }

    useEffect(() => {
        if (query) {
            fetchData(query, movieYear, selectedPage);
        }
    }, [selectedPage]);

    return(
        <div>
        {!movies.Search && <h1 className='text-4xl p-8 text-center'>No Movies to Show</h1>}
        {movies.Search && <div className="flex mt-6 font-bold text-3xl gap-20 justify-center"><h1>Page No.: {selectedPage}</h1><h1>Total Results: {movies.totalResults}</h1></div>}
        <div className='flex flex-wrap justify-center p-10 text-3xl gap-2 w-vw'>
            {movies.Search && movies.Search.map((movie)=>(
            <div key={movie.imdbID} className="border p-2 cursor-pointer w-1/6 bg-black/15" onClick={()=>handleClick(movie.imdbID)}>
                <img src={movie.Poster} alt={movie.Title} className="border-2 rounded-lg object-scale-down max-h-full drop-shadow-md rounded-md m-auto" />
                <h2 className="font-bold mt-2">{movie.Title}</h2>
                <p>{movie.Year}</p>
                <p>Type: {String(movie.Type).charAt(0).toUpperCase() + String(movie.Type).slice(1)}</p>
            </div>
            ))}
        </div>
        {movies.Search && <>
            <h3 className="text-2xl flex justify-center mb-2 font-bold">Page Number(s):</h3>
            <div className="text-2xl flex justify-center gap-3 mb-4">
                <button
                    className="border-2 px-2 font-bold bg-white rounded-md"
                    onClick={() => setPageIndex((i) => Math.max(i - 1, 0))}
                    disabled={pageIndex === 0}
                >
                    Prev
                </button>
                {pageGroup.length > 0 && pageGroup[pageIndex].map((page) => (
                    <button key={page} value={page} className='cursor-pointer' onClick={handlePageClick}>{page}</button>
                ))}
                <button
                    className="border-2 px-2 font-bold bg-white rounded-md"
                    onClick={() => setPageIndex((i) => Math.min(i + 1, pageGroup.length - 1))}
                    disabled={pageIndex === pageGroup.length - 1}
                >
                    Next
                </button>
            </div>
        </>
        }
        </div>
    )
}