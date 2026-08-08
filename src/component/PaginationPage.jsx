import React, { useEffect, useRef, useState } from 'react'
import library_store from '../store/store'
import { BookOpen, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router'

export default function PaginationPage() {
    const ref = useRef(null)
    const { book_by_page, page_data, loading, user_data} = library_store()
    let [pageNum, setPagenum] = useState(1)
    const limit = 5
    let [jumpNum, setJumNum] = useState(1)
    const [has_next, setHas_next] = useState(false)
    const [has_prev, setHas_prev] = useState(false)
    const navigate = useNavigate()
     useEffect(()=>{
        book_by_page(pageNum, limit)
    },[])

    useEffect(()=>{
        if(page_data){
            setHas_next(page_data?.has_next)
            setHas_prev(page_data?.has_prev)
        }
    }, [page_data])

    useEffect(()=>{
        if(page_data){
            setJumNum(page_data?.page)
        }
    }, [page_data])
   

    console.log(page_data)
    console.log(has_next, has_prev)

    async function next_page(){
        setPagenum(pageNum += 1)
        try{
            const res = await book_by_page(pageNum, limit)
        }catch(err){
            console.log(err)
        }
    }
    async function prev_page() {
        setPagenum(pageNum -= 1)
         try{
            const res = await book_by_page(pageNum, limit)
        }catch(err){
            console.log(err)
        }
    }

    async function jump_page(){
        try{
            const res = await book_by_page(jumpNum, limit)
        }catch(err){
            console.log(err)
        }
    }
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
    // function enter(){
    //     document.addEventListener('keypress', (e)=>{
    //         // console.log(e)
    //        if(e.key === "Enter"){
    //         jump_page()
    //        }
    //     })
    // }
    // enter()
    if(loading){
        return(
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 bg-[#FAF6EE]">
                <Loader2 className="w-6 h-6 text-[#6B2737] animate-spin" />
                <span className="text-sm text-[#9C8F7E]">Loading books...</span>
            </div>
    
        )
    }
  return (
    <>
    {/* {
    page_data?.books?.map((value)=>(
        <div key={value?.id}>{value?.bookname}</div>
    ))
    }
    <div style={{display: has_next ?'block':'none'}}><button  onClick={next_page} >next</button><br/></div>

    <div><input type="text" value={jumpNum} placeholder={page_data?.page} 
    onChange={(e)=>setJumNum(e.target.value)}
    onKeyDown={(e)=>{
        if(e.key === "Enter"){
             jump_page()
        }
    }}
    />/{page_data?.pages}</div>
    <div style={{display: has_prev ?'block':'none'}}><button  onClick={prev_page}>prev</button></div> 

    <div className="min-h-screen bg-[#FAF6EE] px-4 sm:px-6 py-10">
        <div className="max-w-5xl mx-auto">
 
            <div className="mb-8 text-center">
                <p className="text-[11px] uppercase tracking-wide text-[#9C8F7E] mb-1">The Collection</p>
                <h1 className="font-serif text-3xl text-[#2C2420]">Browse Books</h1>
            </div>
 
            {page_data?.books?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {page_data.books.map((value)=>(
                        <button
                            key={value?.id}
                            onClick={(e)=>verify(e, value)}
                            className="flex items-center gap-3 bg-white border border-[#C9A961]/40
                                       rounded-xl px-4 py-3 text-left hover:border-[#6B2737]/50
                                       hover:shadow-sm transition-all"
                        >
                            <div className="w-9 h-9 shrink-0 rounded-full bg-[#FAF6EE] border
                                            border-[#C9A961]/40 flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-[#6B2737]" strokeWidth={1.75} />
                            </div>
                            <span className="text-sm font-medium text-[#2C2420] line-clamp-2">
                                {value?.bookname}
                            </span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white border border-[#C9A961]/30 rounded-xl mb-10">
                    <p className="text-sm text-[#9C8F7E]">No books found on this page.</p>
                </div>
            )}
 
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4
                            bg-white border border-[#C9A961]/40 rounded-full px-4 py-2.5">
 
                <div style={{display: has_prev ? 'block' : 'none'}}>
                    <button
                        onClick={prev_page}
                        className="flex items-center gap-1 text-sm font-medium text-[#4A3F35]
                                   hover:text-[#6B2737] px-3 py-1.5 rounded-full
                                   hover:bg-[#FAF6EE] transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                        Prev
                    </button>
                </div>
 
                <div className="flex items-center gap-2 text-sm text-[#4A3F35]">
                    <input
                        type="text"
                        value={jumpNum}
                        placeholder={page_data?.page}
                        onChange={(e)=>setJumNum(e.target.value)}
                        onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                jump_page()
                            }
                        }}
                        className="w-12 text-center text-sm rounded-full bg-[#FAF6EE] border
                                   border-[#C9A961]/40 text-[#2C2420] py-1
                                   focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50
                                   focus:border-[#6B2737]/50"
                    />
                    <span className="text-[#9C8F7E]">/ {page_data?.pages}</span>
                </div>
 
                <div style={{display: has_next ? 'block' : 'none'}}>
                    <button
                        onClick={next_page}
                        className="flex items-center gap-1 text-sm font-medium text-white
                                   bg-[#6B2737] hover:bg-[#571F2C] px-4 py-1.5 rounded-full
                                   transition-colors shadow-sm"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
    </div>
    */}

     <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-baseline justify-between mb-6">
                <h1 className="font-serif text-2xl text-[#2C2420]">Catalog</h1>
                <span className="text-sm text-[#9C8F7E]">
                    Page {page_data?.page} of {page_data?.pages}
                </span>
            </div>
 
            {page_data?.books?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-9">
                    {page_data.books.map((book) => (
                        <a
                            key={book?.id}
                            onClick={(e) => verify(e, book)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block cursor-pointer"
                        >
                            <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-[#EFE8D8] border border-[#C9A961]/30 shadow-sm group-hover:shadow-md transition-shadow">
                                {book?.thumbnail ? (
                                    <img
                                        src={`${import.meta.env.VITE_BASE_URL_BOOKS}${book.thumbnail}`}
                                        alt={book?.bookname}
                                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#9C8F7E] text-xs">
                                        No cover
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-[#2C2420]/0 group-hover:bg-[#2C2420]/10 transition-colors" />
                            </div>
 
                            <p className="mt-3 text-sm font-medium text-[#2C2420] leading-snug line-clamp-2 group-hover:text-[#6B2737] transition-colors">
                                {book?.bookname}
                            </p>
                            <p className="text-xs text-[#9C8F7E] mt-0.5">#{book?.bookcode}</p>
                            <button className="mt-3 w-full bg-[#6B2737] hover:bg-[#521C29] text-[#EFE8D8] text-sm font-medium py-2 px-4 rounded-md transition-colors shadow-sm"
                             onClick={()=>navigate("/detail", {state:{"value":book?.bookname}})}> Detail</button>
                        </a>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <p className="font-serif text-lg text-[#2C2420]">No books on this page</p>
                    <p className="text-sm text-[#9C8F7E] mt-1">Try jumping to a different page.</p>
                </div>
            )}
 
            {/* Pagination controls */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4
                            bg-white border border-[#C9A961]/40 rounded-full px-4 py-2.5">
 
                <div style={{display: has_prev ? 'block' : 'none'}}>
                    <button
                        onClick={prev_page}
                        className="flex items-center gap-1 text-sm font-medium text-[#4A3F35]
                                   hover:text-[#6B2737] px-3 py-1.5 rounded-full
                                   hover:bg-[#FAF6EE] transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                        Prev
                    </button>
                </div>
 
                <div className="flex items-center gap-2 text-sm text-[#4A3F35]">
                    <input
                        type="text"
                        value={jumpNum}
                        placeholder={page_data?.page}
                        onChange={(e)=>setJumNum(e.target.value)}
                        onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                jump_page()
                            }
                        }}
                        className="w-12 text-center text-sm rounded-full bg-[#FAF6EE] border
                                   border-[#C9A961]/40 text-[#2C2420] py-1
                                   focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50
                                   focus:border-[#6B2737]/50"
                    />
                    <span className="text-[#9C8F7E]">/ {page_data?.pages}</span>
                </div>
 
                <div style={{display: has_next ? 'block' : 'none'}}>
                    <button
                        onClick={next_page}
                        className="flex items-center gap-1 text-sm font-medium text-white
                                   bg-[#6B2737] hover:bg-[#571F2C] px-4 py-1.5 rounded-full
                                   transition-colors shadow-sm"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </button>
                </div>
            </div>
        </div>
       
    </>
  )
}
