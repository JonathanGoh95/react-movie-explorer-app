import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export default function SearchPage({movies, fetchData, fetchMovieDetails, query, setQuery, movieYear, setMovieYear, selectedPage, setSelectedPage, loading, setLoading, favourites, setFavourites}) {
    const [pages,setPages] = useState([])           // State for holding the number of pages
    const [pageIndex, setPageIndex] = useState(0);  // State for holding the index for the group of page numbers
    const [searchParams] = useSearchParams();       // Use of Search Params hook to get URL query parameters and store them in the respective states to maintain state integrity throughout

    // Keeps URL consistent with the query parameters whenever they update
    useEffect(() => {
        const pageFromUrl = Number(searchParams.get("page")) || 1;
        const queryFromUrl = searchParams.get("query") || "";
        const yearFromUrl = searchParams.get("year") || "";
        setSelectedPage(pageFromUrl);
        setQuery(queryFromUrl);
        setMovieYear(yearFromUrl);
    }, [searchParams, setSelectedPage, setQuery, setMovieYear]);

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
            setLoading={setLoading}
            setPageIndex={setPageIndex}/>
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
            setLoading={setLoading}
            favourites={favourites}
            setFavourites={setFavourites}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}/>
        </>
    )
}