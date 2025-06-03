import { useEffect } from "react"


export default function SearchBar({movies,fetchData,movieYear,setMovieYear,setPages,selectedPage,query,setQuery}) {
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData(query,movieYear,selectedPage)
    }
    
    useEffect(()=>{     // Sets the Pages state, but only when the movies and setPages states changes
        if (movies.totalResults){
            let totalPages = Math.floor(Number(movies.totalResults)/10)
            let output = []
            for(let i = 1; i <= totalPages; i++){
                output.push(i)
            }
            setPages(output)
        } else{
            setPages([])
        }
    }, [movies, setPages])

    return(
        <form className='flex gap-10 justify-center' onSubmit={handleSubmit}>
            <input className='border-2 text-3xl rounded-lg w-1/2 text-center' type='text' placeholder='Type your input here...' onChange={({target})=>setQuery(target.value)}></input>
            <input className='border-2 text-3xl rounded-lg w-1/8 text-center' type='number' placeholder='Filter by Release Year...' onChange={({target})=>setMovieYear(target.value)}></input>
            <button className='border-2 text-3xl rounded-lg pt-2 pb-2 pl-5 pr-5 cursor-pointer' type="submit">Search</button>
        </form>
    )
}