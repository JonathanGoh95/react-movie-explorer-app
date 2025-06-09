import { Link } from "react-router"

export default function HomePage(){
    
    return(
        <h1 className='text-3xl p-5'><span className='font-bold'>WELCOME!</span><br/><br/>
            Click on the 'Search for Movies' link to begin searching!<br/><br/>
            Click on the 'Favourite Movies' link to view your favourite movies!<br/><br/>
            <div className='m-auto p-4 border-3 font-bold w-7/20'>
                ❗All information/data are retrieved from <Link to='https://www.omdbapi.com' className="hover:text-white hover:underline hover:underline-offset-8" target="_blank">The Open Movie Database (OMDb) API</Link>❗<br/><br/>
                🎉Styled with <Link to='https://www.tailwindcss.com' className="hover:text-white hover:underline hover:underline-offset-8" target="_blank">Tailwind CSS</Link>🎉
            </div>
        </h1>
    )
}