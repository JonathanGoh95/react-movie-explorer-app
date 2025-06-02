import { NavLink } from "react-router"

export default function NavBar() {
    <nav>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/search">Search For Movies</NavLink></li>
            <li><NavLink to="/favorites">Favorite Movies</NavLink></li>
        </ul>
    </nav>
}