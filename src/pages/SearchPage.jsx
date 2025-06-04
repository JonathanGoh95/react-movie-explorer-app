import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useState } from "react";

export default function SearchPage({movies,fetchData,fetchMovieDetails,movieYear,setMovieYear,selectedPage,setSelectedPage}) {
    const [query,setQuery] = useState('')
    const [pages,setPages] = useState([])

    return(
        <>
            <h1 className='text-4xl p-5 font-bold'>Search for a Movie (Specify the Movie Release Year for better accuracy)</h1>
            <SearchBar movies={movies} fetchData={fetchData} movieYear={movieYear} setMovieYear={setMovieYear} setPages={setPages} selectedPage={selectedPage} setSelectedPage={setSelectedPage} query={query} setQuery={setQuery}/>
            <SearchResults movies={movies} fetchMovieDetails={fetchMovieDetails} pages={pages} selectedPage={selectedPage} setSelectedPage={setSelectedPage} fetchData={fetchData} query={query} movieYear={movieYear}/>
        </>
    )
}