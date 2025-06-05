import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useState } from "react";

export default function SearchPage({movies,fetchData,fetchMovieDetails,movieYear,setMovieYear,selectedPage,setSelectedPage,loading,setLoading}) {
    const [query,setQuery] = useState('')           // State for holding the query for movie title
    const [pages,setPages] = useState([])           // State for holding the number of pages

    return(
        <>
            <h1 className='text-4xl p-5 font-bold'>Search for a Movie (Movie Release Year can only be specified after a Movie Title query is given)</h1>
            <SearchBar
                movies={movies}
                fetchData={fetchData}
                movieYear={movieYear}
                setMovieYear={setMovieYear}
                setPages={setPages}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                query={query}
                setQuery={setQuery}
                setLoading={setLoading}/>
            <SearchResults
                movies={movies}
                fetchMovieDetails={fetchMovieDetails}
                pages={pages}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                fetchData={fetchData}
                query={query}
                movieYear={movieYear}
                loading={loading}
                setLoading={setLoading}/>
        </>
    )
}