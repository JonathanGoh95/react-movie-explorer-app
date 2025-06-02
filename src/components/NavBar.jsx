import { NavLink } from "react-router"

export default function NavBar({clearMovies}) {
    return (
    <nav class='border-b-2 border-black'>
        <ul class='text-3xl flex gap-20 justify-center p-5'>
            <li><NavLink to="/" onClick={clearMovies}>Home</NavLink></li>
            <li><NavLink to="/search">Search For Movies</NavLink></li>
            <li><NavLink to="/favourites">Favourite Movies</NavLink></li>
        </ul>
    </nav>)
}