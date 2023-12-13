'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';


const GifSearch: React.FC<any> = ({ addToFavorites }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [gifs, setGifs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showPagination, setShowPagination] = useState<boolean>(false);
    const gifsPerPage = 12;

    const searchGifs = useCallback(async () => {
        try {
            setLoading(true);
            const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${gifsPerPage}&offset=${(currentPage - 1) * gifsPerPage}`);
            const data = await response.json();
            setGifs(data.data);
            setShowPagination(true);
        } catch (error) {
            console.error('Error fetching GIFs:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, currentPage]);

    useEffect(() => {
        if (searchTerm) {
            searchGifs();
        }
    }, [searchGifs, searchTerm, currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="mb-4 text-white text-2xl font-bold">GIF Search</h2>
                <div className="flex mb-4 w-full sm:w-2/4">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for GIFs..." className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />

                    {/* Only icon for mobile devices */}
                    <button onClick={() => searchGifs()} disabled={!searchTerm || loading} className="ml-2 bg-indigo-500 text-white rounded-md py-1.5 px-3 disabled:opacity-40 flex items-center lg:hidden">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>

                    {/* Icon + button name for larger devices */}
                    <button onClick={() => searchGifs()} disabled={!searchTerm || loading} className="ml-2 bg-indigo-500 text-white rounded-md py-1.5 px-3 disabled:opacity-40 flex items-center hidden lg:flex">
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        Search
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex items-center justify-center h-screen">
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-white" />
                </div>
            )}

            {gifs.length > 0 && (
                <div className="my-12 flex justify-center">
                    {showPagination && (
                        <>
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="mr-2 bg-indigo-500 text-white rounded-md py-1.5 px-3 disabled:opacity-40">
                                Previous
                            </button>

                            {[currentPage - 1, currentPage, currentPage + 1].map((page) => (
                                <span key={page} className="mx-2 text-white">
                                    {page > 0 && (
                                        <button onClick={() => handlePageChange(page)} className={`${page === currentPage ? 'bg-indigo-500 transform scale-110' : 'bg-indigo-900'} text-white rounded-md py-1.5 px-3`}>
                                            {page}
                                        </button>
                                    )}
                                </span>
                            ))}

                            <button onClick={() => handlePageChange(currentPage + 1)} className="ml-2 bg-indigo-500 text-white rounded-md py-1.5 px-3">
                                Next
                            </button>
                        </>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gifs.map((gif: any) => (
                    <div key={gif.id} className="relative aspect-w-1 aspect-h-1 p-4 rounded-md overflow-hidden bg-slate-900/50 backdrop-blur-md flex items-center">
                        <div className="aspect-w-1 aspect-h-1 mx-auto object-cover">
                            <Image src={gif.images.fixed_height.url} alt={gif.title} width={gif.images.fixed_height.width} height={gif.images.fixed_height.height} className="object-cover w-full h-full" />
                        </div>
                        <button onClick={() => addToFavorites(gif)} className="absolute top-2 right-2 bg-white/5 text-white rounded-full p-1 focus:outline-none transition-transform transform hover:scale-150 click-scale-anim">
                            ❤️
                        </button>
                    </div>
                ))}
            </div>

            {gifs.length > 0 && (
                <div className="mt-12 flex justify-center">
                    {showPagination && (
                        <>
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="mr-2 bg-indigo-500 text-white rounded-md py-1.5 px-3 disabled:opacity-40">
                                Previous
                            </button>

                            {[currentPage - 1, currentPage, currentPage + 1].map((page) => (
                                <span key={page} className="mx-2 text-white">
                                    {page > 0 && (
                                        <button onClick={() => handlePageChange(page)} className={`${page === currentPage ? 'bg-indigo-500 transform scale-110' : 'bg-indigo-900'} text-white rounded-md py-1.5 px-3`}>
                                            {page}
                                        </button>
                                    )}
                                </span>
                            ))}

                            <button onClick={() => handlePageChange(currentPage + 1)} className="ml-2 bg-indigo-500 text-white rounded-md py-1.5 px-3">
                                Next
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default GifSearch;
