import { useEffect } from "react"
import { useNavigate } from "react-router";

export default function SearchBar({movies,fetchData,movieYear,setMovieYear,setPages,selectedPage,setSelectedPage,query,setQuery,setLoading}) {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        fetchData(query,movieYear,selectedPage)     
        setLoading(false)
        selectedPage !== 1 && setSelectedPage(1)    // Resets the results page back to the first page whenever a new search is conducted
        navigate(`/search/?page=1`)                 // Resets the Page Count of the URL to 1 whenever a new search is conducted
    }

    useEffect(()=>{     // Sets the Pages state, but only when the movies and setPages states changes
        if (movies.totalResults){
            let totalPages = Math.ceil(Number(movies.totalResults)/10)
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
        <>
        <form className='flex gap-10 justify-center' onSubmit={handleSubmit}>
            <input className='border-2 text-3xl rounded-lg w-1/2 text-center' type='text' placeholder='Type the Movie Title here...' onChange={({target})=>setQuery(target.value)}></input>
            <input className='border-2 text-3xl rounded-lg w-1/7 text-center' type='number' placeholder='Filter by Release Year...' onChange={({target})=>setMovieYear(target.value)} disabled={query === ''}></input>
            <button className='border-2 text-3xl rounded-lg pt-2 pb-2 pl-5 pr-5 cursor-pointer' type="submit">Search</button>
        </form>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        </>
    )
}