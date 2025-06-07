import { NavLink } from "react-router"

export default function NavBar({clearMovies,query,movieYear,selectedPage}) {
        // Create the URL with the latest query state values
        const params = new URLSearchParams();
        if (query) params.append("query", query);
        if (movieYear) params.append("year", movieYear);
        params.append("page", selectedPage || 1);

    return (
    <nav className='border-b-2 border-black bg-black/30 font-bold'>
        <ul className='text-3xl flex gap-20 justify-center p-5'>
            <li><NavLink to="/" onClick={clearMovies} className='hover:text-white'>Home</NavLink></li>
            <li><NavLink to={`/search?${params.toString()}`} className='hover:text-white'>Search For Movies</NavLink></li>
            <li><NavLink to="/favourites" className='hover:text-white'>My Favourite Movies</NavLink></li>
        </ul>
    </nav>
    )
}