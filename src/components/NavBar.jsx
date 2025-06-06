import { NavLink } from "react-router"

export default function NavBar({clearMovies}) {
    return (
    <nav className='border-b-2 border-black bg-black/30'>
        <ul className='text-3xl flex gap-20 justify-center p-5'>
            <li><NavLink to="/" onClick={clearMovies}>Home</NavLink></li>
            <li><NavLink to="/search" onClick={clearMovies}>Search For Movies</NavLink></li>
            <li><NavLink to="/favourites">My Favourite Movies</NavLink></li>
        </ul>
    </nav>
    )
}