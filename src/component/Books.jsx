import React, { useEffect } from 'react'
import { data } from 'react-router'
import library_store from '../store/store.js'
import { User } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'


export default function Books() {
    const { books, loading, get_books, user_data } = library_store()

    useEffect(() => {
        get_books()
    }, [get_books])

    console.log(books)

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


    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="aspect-[2/3] bg-[#EFE8D8] rounded-md" />
                            <div className="h-3 bg-[#EFE8D8] rounded mt-3 w-4/5" />
                            <div className="h-3 bg-[#EFE8D8] rounded mt-2 w-2/5" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    if (!books || books.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
                <p className="font-serif text-lg text-[#2C2420]">The shelves are empty</p>
                <p className="text-sm text-[#9C8F7E] mt-1">No books have been added to the catalog yet.</p>
            </div>
        )
    }

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                <div className="flex items-baseline justify-between mb-6">
                    <h1 className="font-serif text-2xl text-[#2C2420]">Catalog</h1>
                    <span className="text-sm text-[#9C8F7E]">{books.length} books</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-9">
                    {books?.map((book) => (
                        <a
                            key={book?.id}
                            onClick={(e) => verify(e, book)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
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
                        </a>
                    ))}
                </div>
            </div>
        </>
    )

}
