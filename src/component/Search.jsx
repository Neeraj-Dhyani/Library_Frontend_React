import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import library_store from '../store/store'
import toast, { Toaster } from 'react-hot-toast'
import { BookOpen } from 'lucide-react'

export default function Search() {
    const {search_book, loading, search_data, user_data} = library_store()
    const location = useLocation()
    const data = location.state.value

    useEffect(()=>{
      search_book(data)
    },[])
    
    console.log(search_data)

    function verify(e, book) {
        // console.log(user_data)
        if (!user_data) {
            e.preventDefault();
            toast.error("Login First")
            return
        } else {
            window.open(`${import.meta.env.VITE_BASE_URL_BOOKS}${book.bookpdf}`)
        }
    }
    if(loading){
      return(
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col sm:flex-row gap-6 animate-pulse">
                <div className="w-full sm:w-40 aspect-[2/3] bg-[#EFE8D8] rounded-md shrink-0" />
                <div className="flex-1 space-y-3 pt-1">
                    <div className="h-5 bg-[#EFE8D8] rounded w-3/4" />
                    <div className="h-3 bg-[#EFE8D8] rounded w-1/3" />
                    <div className="h-3 bg-[#EFE8D8] rounded w-2/5" />
                    <div className="h-9 bg-[#EFE8D8] rounded-full w-32 mt-4" />
                </div>
            </div>
        </div>
      
      )
    }
    const book = search_data?.data
    if(!book){
        return(
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
                <p className="font-serif text-lg text-[#2C2420]">No matching book found</p>
                <p className="text-sm text-[#9C8F7E] mt-1">Try searching a different title or author.</p>
            </div>
        )
    }
  return (
    // <div>{search_data?.data?.bookname}</div>
    <>
       <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
            <p className="text-[11px] uppercase tracking-wide text-[#9C8F7E] mb-6">Search Result</p>
 
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-40 aspect-[2/3] rounded-md overflow-hidden bg-[#EFE8D8] border border-[#C9A961]/30 shadow-sm shrink-0">
                    {book?.thumbnail ? (
                        <img
                            src={`${import.meta.env.VITE_BASE_URL_BOOKS}${book.thumbnail}`}
                            alt={book?.bookname}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#9C8F7E] text-xs">
                            No cover
                        </div>
                    )}
                </div>
 
                <div className="flex-1 pt-1">
                    <h1 className="font-serif text-2xl text-[#2C2420] leading-snug">
                        {book?.bookname}
                    </h1>
                    <p className="text-sm text-[#9C8F7E] mt-1">#{book?.bookcode}</p>
                    <p className="text-xs text-[#9C8F7E] mt-1">
                        Added {book?.created_at ? new Date(book.created_at).toLocaleDateString() : ''}
                    </p>
 
                    <button
                        onClick={verify}
                        className="flex items-center gap-2 mt-6 text-sm font-medium text-white
                                   bg-[#6B2737] hover:bg-[#571F2C] rounded-full px-5 py-2
                                   transition-colors shadow-sm"
                    >
                        <BookOpen className="w-4 h-4" strokeWidth={1.75} />
                        Open Book
                    </button>
                </div>
            </div>
        </div>
    </>

  )
}
