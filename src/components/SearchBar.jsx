import { useState } from "react"


export default function SearchBar({fetchData,fetchDataWithYear,movieYear,setMovieYear}) {
    const [query,setQuery] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        movieYear === '' ? fetchData(query) : fetchDataWithYear(query,movieYear)
    }
    
    return(
        <form class='flex gap-10 justify-center' onSubmit={handleSubmit}>
            <input class='border-2 text-3xl rounded-lg w-1/2 text-center' type='text' placeholder='Type your input here...' onChange={({target})=>setQuery(target.value)}></input>
            <input class='border-2 text-3xl rounded-lg w-1/8 text-center' type='number' placeholder='Filter by Movie Year...' onChange={({target})=>setMovieYear(target.value)}></input>
            <button class='border-2 text-3xl rounded-lg pt-2 pb-2 pl-5 pr-5 cursor-pointer' type="submit">Search</button>
        </form>
    )
}