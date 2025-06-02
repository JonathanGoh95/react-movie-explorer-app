import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

export default function SearchPage({movies,fetchData,fetchMovieDetails,selectedMovie}) {
    
    
    return(
        <>
            <h1 class='text-4xl p-5 font-bold'>Search for a Movie</h1>
            <SearchBar fetchData={fetchData}/>
            <SearchResults movies={movies} selectedMovie={selectedMovie} fetchMovieDetails={fetchMovieDetails}/>
        </>
    )
}