"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface GifSearchProps {
    addToFavorites: (gif: any) => void;
    removeFromFavorites: (gifId: string) => void;
}

const GifSearch: React.FC<any> = ({ addToFavorites, removeFromFavorites }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [gifs, setGifs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showPagination, setShowPagination] = useState<boolean>(false);
    const gifsPerPage = 12;

    const searchGifs = async () => {
        try {
            setLoading(true);
            const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${gifsPerPage}&offset=${(currentPage - 1) * gifsPerPage}`);
            const data = await response.json();
            setGifs(data.data);
            setShowPagination(true); // Show pagination after searching
        } catch (error) {
            console.error('Error fetching GIFs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            searchGifs();
        }
    }, [searchTerm, currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="mb-4 text-white text-2xl font-bold">GIF Search</h2>
                <div className="flex mb-4 w-full sm:w-2/4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for GIFs..."
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                    <button
                        onClick={() => searchGifs()}
                        disabled={!searchTerm || loading}
                        className="ml-2 bg-indigo-500 text-white rounded-md py-1.5 px-3 disabled:opacity-40 flex items-center"
                    >
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
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="mr-2 bg-indigo-500 text-white rounded-md py-1.5 px-3 disabled:opacity-40"
                            >
                                Previous
                            </button>
                            {[currentPage - 1, currentPage, currentPage + 1].map((page) => (
                                <span key={page} className="mx-2 text-white">
                                    {page > 0 && (
                                        <button
                                            onClick={() => handlePageChange(page)}
                                            className={`${page === currentPage ? 'bg-indigo-500 transform scale-110' : 'bg-indigo-900'
                                                } text-white rounded-md py-1.5 px-3`}
                                        >
                                            {page}
                                        </button>
                                    )}
                                </span>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="ml-2 bg-indigo-500 text-white rounded-md py-1.5 px-3"
                            >
                                Next
                            </button>
                        </>
                    )}
                </div>
            )}

            {gifs.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gifs.map((gif: any) => (
                        <div key={gif.id} className="relative">
                            <img src={gif.images.fixed_height.url} alt={gif.title} className="cursor-pointer rounded-md overflow-hidden bg-white/20 backdrop-blur-md p-4 mx-auto object-cover" />
                            <button
                                onClick={() => addToFavorites(gif)}
                                className="absolute top-2 right-2 bg-white/5 text-white rounded-full p-1 focus:outline-none"
                            >
                                ❤️
                            </button>
                        </div>
                    ))}
                </div>
            )}


            {gifs.length > 0 && (
                <div className="mt-12 flex justify-center">
                    {showPagination && (
                        <>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="mr-2 bg-indigo-500 text-white rounded-md py-1.5 px-3 disabled:opacity-40"
                            >
                                Previous
                            </button>
                            {[currentPage - 1, currentPage, currentPage + 1].map((page) => (
                                <span key={page} className="mx-2 text-white">
                                    {page > 0 && (
                                        <button
                                            onClick={() => handlePageChange(page)}
                                            className={`${page === currentPage ? 'bg-indigo-500 transform scale-110' : 'bg-indigo-900'
                                                } text-white rounded-md py-1.5 px-3`}
                                        >
                                            {page}
                                        </button>
                                    )}
                                </span>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="ml-2 bg-indigo-500 text-white rounded-md py-1.5 px-3"
                            >
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
