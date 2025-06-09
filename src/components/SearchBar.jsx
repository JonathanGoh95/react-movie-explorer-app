import { useEffect } from "react"
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

export default function SearchBar({movies, fetchData, movieYear, setMovieYear, setPages, selectedPage, setSelectedPage, query, setQuery, setLoading, setPageIndex}) {
    const currentYear = Number(new Date().getFullYear());
    const navigate = useNavigate()

    // Movie Release Year Validation
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(movieYear !== '' && movieYear > currentYear){
            toast.error(`Release Year should be before the current year: ${currentYear}`)
            return
        } else if(movieYear !== '' && movieYear < 1000){
            toast.error(`Release Year should be 4 digits`)
            return
        }
        setLoading(true)                                                // Logic for handling the Loading banner while fetching data from API
        await fetchData(query,movieYear,selectedPage)     
        setLoading(false)
        selectedPage !== 1 && setSelectedPage(1)                        // Resets the results page back to the first page whenever a new search is conducted
        setPageIndex(0)                                                 // Resets the index to the first group of pages (i.e. Pages 1 to 10) whenever a new search is conducted
        navigate(`/search/?page=1&query=${query}&year=${movieYear}`)    // Resets the Page Count of the URL to 1 whenever a new search is conducted
    }
    
    // Sets the Number of Pages state, but only when the movies and setPages states changes
    useEffect(()=>{     
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
            {/* Toastify Container for Visual Customization and Appearance in Browser */}
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