import FavouriteMovies from "../components/FavouriteMovies";

export default function FavouritesPage({favourites, setFavourites}) {
    return(
    <>
        <h1 className='text-4xl p-5 font-bold'>My Favourite Movies</h1>
        {favourites.length === 0 && <h1 className='text-4xl p-8 text-center'>No Favourite Movies Added Yet</h1>}
        <FavouriteMovies favourites={favourites} setFavourites={setFavourites}/>
    </>
    )
}