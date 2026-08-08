import React, { useEffect } from 'react'
import library_store from '../store/store'
import { useLocation, Link } from 'react-router'

export default function DetailPage() {
    const { book_detail, book_detail_data, loading } = library_store()
    const location = useLocation()
    const title = location.state.value

    useEffect(() => {
        book_detail(title)
    }, [])

    const book = book_detail_data?.docs
        ? book_detail_data.docs[0]
        : (Array.isArray(book_detail_data) ? book_detail_data[0] : book_detail_data);

    if (!book) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <p className="text-xl text-gray-600 animate-pulse">Loading encyclopedic data...</p>
            </div>
        );
    }

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "https://via.placeholder.com/250x350?text=No+Cover+Available";
    return (
        <>
            <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans text-gray-900 bg-white min-h-screen">
            
            <div className="mb-4">
                <Link to="/" className="text-[#0645ad] hover:underline text-sm font-medium inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-1">
                    <span aria-hidden="true">←</span> Back to Search
                </Link>
            </div>

            {/* Page Header */}
            <header className="border-b border-gray-400 pb-2 mb-6">
                <h1 className="text-4xl font-serif text-black">{book.title}</h1>
                <p className="text-sm text-gray-700 mt-1" aria-hidden="true">From the Open Library Free Encyclopedia</p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* LEFT COLUMN: Main Content */}
                <main className="md:w-2/3 order-2 md:order-1">
                    
                    {/* Introductory Lead Section */}
                    <p className="text-lg leading-relaxed mb-4">
                        <strong><i>{book.title}</i></strong> is a notable literary work
                        {book.author_name ? ` authored by ${book.author_name.join(', ')}` : ''} 
                        <a href="#ref-1" onClick={(e) => handleScroll(e, 'ref-1')} className="text-[#0645ad] text-xs align-super hover:underline">[1]</a>. 
                        It was first published in the year <strong>{book.first_publish_year || 'Unknown'}</strong>. 
                        As a highly documented entry in the Open Library database, the work has a robust physical and digital footprint, 
                        boasting an extensive history with {book.edition_count} recorded editions globally 
                        <a href="#ref-2" onClick={(e) => handleScroll(e, 'ref-2')} className="text-[#0645ad] text-xs align-super hover:underline">[2]</a>.
                    </p>

                    {/* Table of Contents */}
                    <nav className="bg-[#f8f9fa] border border-[#a2a9b1] p-4 w-max min-w-[250px] mb-8" aria-labelledby="toc-heading">
                        <h2 id="toc-heading" className="text-center font-bold mb-2 text-sm text-black">Contents</h2>
                        <ul className="list-decimal list-inside text-[#0645ad] text-sm font-medium space-y-1">
                            <li><button onClick={(e) => scrollToSection('authorship')} className="hover:underline">Authorship & Origin</button></li>
                            <li><button onClick={(e) => scrollToSection('publication')} className="hover:underline">Publication History</button></li>
                            <li><button onClick={(e) => scrollToSection('digital')} className="hover:underline">Digital Archives & Access</button></li>
                            <li><button onClick={(e) => scrollToSection('collections')} className="hover:underline">Curated Collections</button></li>
                            <li><button onClick={(e) => scrollToSection('references')} className="hover:underline">References</button></li>
                        </ul>
                    </nav>

                    {/* Section 1: Authorship & Origin */}
                    <section id="authorship" tabIndex={-1} className="mb-8 outline-none border-t border-transparent" aria-labelledby="heading-authorship">
                        <h2 id="heading-authorship" className="text-2xl font-serif border-b border-[#a2a9b1] pb-1 mb-4 text-black">Authorship & Origin</h2>
                        <p className="mb-3 leading-relaxed">
                            The primary attribution for <i>{book.title}</i> is credited to {book.author_name ? <strong>{book.author_name.join(' and ')}</strong> : 'an unknown author'}. 
                            The initial publication occurred in {book.first_publish_year || 'an unrecorded year'}. 
                            In modern library systems, the author is cataloged under the Open Library Author Key(s): 
                            {book.author_key ? book.author_key.map(key => <code key={key} className="bg-gray-100 text-[#d14] px-1 mx-1 rounded border border-gray-300">{key}</code>) : ' N/A'}.
                        </p>
                    </section>

                    {/* Section 2: Publication History */}
                    <section id="publication" tabIndex={-1} className="mb-8 outline-none" aria-labelledby="heading-publication">
                        <h2 id="heading-publication" className="text-2xl font-serif border-b border-[#a2a9b1] pb-1 mb-4 text-black">Publication History</h2>
                        <p className="mb-3 leading-relaxed">
                            Since its debut, the text has undergone numerous printings and revisions, resulting in a total of <strong>{book.edition_count} distinct editions</strong> tracked by bibliographers. 
                        </p>
                        {book.language && (
                            <p className="leading-relaxed">
                                Demonstrating a broad cultural reach, the text has been translated and preserved in multiple languages. The primary linguistic codes associated with these editions include: 
                                <span className="uppercase font-semibold ml-1 bg-gray-100 px-2 py-1 rounded border border-gray-200">{book.language.join(', ')}</span>.
                            </p>
                        )}
                    </section>

                    {/* Section 3: Digital Availability */}
                    <section id="digital" tabIndex={-1} className="mb-8 outline-none" aria-labelledby="heading-digital">
                        <h2 id="heading-digital" className="text-2xl font-serif border-b border-[#a2a9b1] pb-1 mb-4 text-black">Digital Archives & Access</h2>
                        <p className="mb-3 leading-relaxed">
                            In the era of digital preservation, efforts to digitize <i>{book.title}</i> have yielded varied levels of access. The primary E-Book access status is currently designated as <strong>{book.ebook_access}</strong>.
                        </p>
                        
                        <div className="bg-[#f8f9fa] border-l-4 border-[#0645ad] p-4 mb-4">
                            <ul className="list-disc list-inside space-y-2">
                                {book.has_fulltext ? (
                                    <li className="text-green-900 font-medium">A complete full-text digital copy is accessible for researchers and readers.</li>
                                ) : (
                                    <li className="text-red-800 font-medium">Full-text digital access is currently restricted, limited, or unavailable.</li>
                                )}
                                {book.public_scan_b ? (
                                    <li className="text-blue-900 font-medium">Publicly verifiable scans of the original physical manuscript exist within the database.</li>
                                ) : (
                                    <li className="text-gray-700">No public raw scans have been verified for this specific entry.</li>
                                )}
                            </ul>
                        </div>

                        {book.lending_identifier_s && (
                            <p className="text-sm text-gray-700">
                                Institutional lending identifier: <code>{book.lending_identifier_s}</code> 
                                {book.lending_edition_s && ` (Edition ID: ${book.lending_edition_s})`}
                            </p>
                        )}
                    </section>

                    {/* Section 4: Curated Collections (Using ia_collection) */}
                    {book.ia_collection && book.ia_collection.length > 0 && (
                        <section id="collections" tabIndex={-1} className="mb-8 outline-none" aria-labelledby="heading-collections">
                            <h2 id="heading-collections" className="text-2xl font-serif border-b border-[#a2a9b1] pb-1 mb-4 text-black">Curated Collections</h2>
                            <p className="mb-3 leading-relaxed">
                                The Internet Archive has included this work in several curated digital collections, indicating its relevance to various academic and preservation initiatives:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {book.ia_collection.map((collection, index) => (
                                    <span key={index} className="bg-[#eaecf0] border border-[#a2a9b1] px-2 py-1 text-sm text-[#0645ad] rounded">
                                        {collection}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Section 5: References (Wikipedia Style) */}
                    <section id="references" tabIndex={-1} className="mb-8 outline-none" aria-labelledby="heading-references">
                        <h2 id="heading-references" className="text-2xl font-serif border-b border-[#a2a9b1] pb-1 mb-4 text-black">References</h2>
                        <ol className="list-decimal list-inside text-sm space-y-2 marker:text-[#0645ad]">
                            <li id="ref-1" tabIndex={-1} className="outline-none">
                                <span className="text-[#0645ad]">^</span> Open Library Catalog, Author attribution metadata. 
                                {book.author_key && ` Retrieved via identifiers: ${book.author_key.join(', ')}`}
                            </li>
                            <li id="ref-2" tabIndex={-1} className="outline-none">
                                <span className="text-[#0645ad]">^</span> Internet Archive / Open Library Database. Work Key: <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer" className="text-[#0645ad] hover:underline">{book.key} ↗</a>. Accessed 2026.
                            </li>
                            {book.ia && book.ia.length > 0 && (
                                <li>
                                    <span className="text-[#0645ad]">^</span> Source material scans archived at: 
                                    {book.ia.map((archive, index) => (
                                        <span key={index}>
                                            <a href={`https://archive.org/details/${archive}`} target="_blank" rel="noopener noreferrer" className="text-[#0645ad] hover:underline ml-1">
                                                {archive} ↗
                                            </a>
                                            {index < book.ia.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </li>
                            )}
                        </ol>
                    </section>

                </main>

                {/* RIGHT COLUMN: Infobox */}
                <aside className="md:w-1/3 order-1 md:order-2" aria-label="Quick Facts Infobox">
                    <div className="border border-[#a2a9b1] bg-[#f8f9fa] p-2 text-sm shadow-sm float-right w-full mb-6">
                        
                        <h2 className="text-center text-lg font-bold bg-[#eaecf0] p-2 mb-3 border border-[#a2a9b1] italic text-black">
                            {book.title}
                        </h2>
                        
                        <div className="flex justify-center mb-4">
                            <img 
                                src={coverUrl} 
                                alt={book.cover_i ? `Book cover for ${book.title}` : `No cover image available for ${book.title}`} 
                                className="max-w-full h-auto border border-gray-400 object-cover shadow-sm"
                                style={{ maxHeight: '350px' }}
                            />
                        </div>

                        <table className="w-full text-left border-collapse bg-white border border-[#a2a9b1]">
                            <caption className="sr-only">Quick facts about the book {book.title}</caption>
                            <tbody>
                                <tr className="border-b border-[#eaecf0]">
                                    <th scope="row" className="py-2 px-3 font-semibold align-top bg-[#eaecf0] w-2/5 text-black">Author(s)</th>
                                    <td className="py-2 px-3">{book.author_name ? book.author_name.join(', ') : 'Unknown'}</td>
                                </tr>
                                <tr className="border-b border-[#eaecf0]">
                                    <th scope="row" className="py-2 px-3 font-semibold align-top bg-[#eaecf0] text-black">First Published</th>
                                    <td className="py-2 px-3">{book.first_publish_year || 'N/A'}</td>
                                </tr>
                                <tr className="border-b border-[#eaecf0]">
                                    <th scope="row" className="py-2 px-3 font-semibold align-top bg-[#eaecf0] text-black">Editions</th>
                                    <td className="py-2 px-3">{book.edition_count || '0'}</td>
                                </tr>
                                <tr className="border-b border-[#eaecf0]">
                                    <th scope="row" className="py-2 px-3 font-semibold align-top bg-[#eaecf0] text-black">Languages</th>
                                    <td className="py-2 px-3 uppercase text-xs break-words">
                                        {book.language ? book.language.join(', ') : 'N/A'}
                                    </td>
                                </tr>
                                <tr className="border-b border-[#eaecf0]">
                                    <th scope="row" className="py-2 px-3 font-semibold align-top bg-[#eaecf0] text-black">Access Level</th>
                                    <td className="py-2 px-3 capitalize">{book.ebook_access || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="py-2 px-3 font-semibold align-top bg-[#eaecf0] text-black">Work Key</th>
                                    <td className="py-2 px-3 break-all text-xs font-mono">{book.key || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </aside>
            </div>

            {/* BOTTOM: Wikipedia Style Categories */}
            <div className="border border-[#a2a9b1] bg-[#f8f9fa] p-3 mt-8">
                <div className="flex items-start gap-2">
                    <span className="text-[#0645ad] font-bold text-sm whitespace-nowrap">Categories:</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#0645ad]">
                        {book.ia_collection && book.ia_collection.length > 0 ? (
                            book.ia_collection.map((cat, i) => (
                                <span key={i} className="hover:underline cursor-pointer capitalize">{cat.replace(/-/g, ' ')}</span>
                            ))
                        ) : (
                            <span>Books</span>
                        )}
                        <span className="hover:underline cursor-pointer">{book.first_publish_year} books</span>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}
