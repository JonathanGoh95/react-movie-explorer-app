import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

export default function SearchPage({movies,fetchData,fetchDataWithYear,fetchMovieDetails,selectedMovie,movieYear,setMovieYear}) {
    
    
    return(
        <>
            <h1 class='text-4xl p-5 font-bold'>Search for a Movie</h1>
            <SearchBar fetchData={fetchData} fetchDataWithYear={fetchDataWithYear} movieYear={movieYear} setMovieYear={setMovieYear}/>
            <SearchResults movies={movies} selectedMovie={selectedMovie} fetchMovieDetails={fetchMovieDetails}/>
        </>
    )
}