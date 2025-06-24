import React, { useState, useEffect } from 'react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const Components = {
  // Header Component
  Header: ({ searchQuery, setSearchQuery, onSearch }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch(value);
    };

    return (
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}>
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="text-red-600 text-2xl md:text-3xl font-bold cursor-pointer">
              NETFLIX
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">TV Shows</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">New & Popular</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">My List</a>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <div className="flex items-center bg-black border border-white rounded px-3 py-1">
                  <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search movies, TV shows..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="bg-transparent text-white placeholder-gray-400 outline-none w-48"
                    autoFocus
                    onBlur={() => !searchQuery && setShowSearch(false)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2C6.686 2 4 4.686 4 8v2.17c0 .357-.096.707-.268 1.018L2.456 13.83a1 1 0 00.824 1.549h2.95A2.5 2.5 0 006 17c0 .828.672 1.5 1.5 1.5h5c.828 0 1.5-.672 1.5-1.5a2.5 2.5 0 00-.23-1.621h2.95a1 1 0 00.824-1.549l-1.276-2.642A2.17 2.17 0 0116 10.17V8c0-3.314-2.686-6-6-6z"/>
              </svg>
            </button>

            {/* Profile */}
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-semibold cursor-pointer">
              U
            </div>
          </div>
        </div>
      </header>
    );
  },

  // Hero Component
  Hero: ({ movie, onPlayClick }) => {
    const truncateString = (str, num) => {
      if (str?.length <= num) return str;
      return str?.slice(0, num) + '...';
    };

    return (
      <div className="relative h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}${movie?.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-4 md:px-8 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {movie?.title || movie?.name}
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-200 leading-relaxed">
              {truncateString(movie?.overview, 200)}
            </p>
            
            {/* Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={onPlayClick}
                className="flex items-center bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors duration-200"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Play
              </button>
              <button className="flex items-center bg-gray-500/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-500/90 transition-colors duration-200">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                More Info
              </button>
            </div>

            {/* Rating and year */}
            <div className="flex items-center mt-6 space-x-4 text-gray-300">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{movie?.vote_average?.toFixed(1)}</span>
              </div>
              <span>{new Date(movie?.release_date || movie?.first_air_date).getFullYear()}</span>
              <span className="border border-gray-400 px-2 py-1 text-xs rounded">HD</span>
            </div>
          </div>
        </div>
      </div>
    );
  },

  // Movie Row Component
  MovieRow: ({ title, movies, onMovieClick, isLarge = false }) => {
    const [scrollX, setScrollX] = useState(0);

    const slide = (direction) => {
      const container = document.getElementById(`row-${title.replace(/\s+/g, '')}`);
      const scrollAmount = container.clientWidth * 0.8;
      
      if (direction === 'left') {
        setScrollX(prev => Math.min(prev + scrollAmount, 0));
      } else {
        const maxScroll = -(container.scrollWidth - container.clientWidth);
        setScrollX(prev => Math.max(prev - scrollAmount, maxScroll));
      }
    };

    return (
      <div className="movie-row">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-8">
          {title}
        </h2>
        <div className="relative group">
          {/* Left Arrow */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            onClick={() => slide('left')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Movies Container */}
          <div 
            id={`row-${title.replace(/\s+/g, '')}`}
            className="flex overflow-hidden transition-transform duration-500 ease-in-out px-4 md:px-8"
            style={{ transform: `translateX(${scrollX}px)` }}
          >
            {movies?.slice(0, 20).map((movie, index) => (
              <div
                key={movie.id}
                className={`flex-shrink-0 mr-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                  isLarge ? 'w-48 md:w-64' : 'w-32 md:w-48'
                }`}
                onClick={() => onMovieClick(movie)}
              >
                <div className="relative group/card">
                  <img
                    src={movie.poster_path ? 
                      `${IMAGE_BASE_URL}${movie.poster_path}` : 
                      'https://via.placeholder.com/300x450?text=No+Image'
                    }
                    alt={movie.title || movie.name}
                    className="w-full rounded-lg shadow-lg object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                    }}
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-lg flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                        {movie.title || movie.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{movie.vote_average?.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            onClick={() => slide('right')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  },

  // Movie Modal Component
  MovieModal: ({ movie, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div 
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            {movie.trailerUrl ? (
              <>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                  </div>
                )}
                <iframe
                  src={movie.trailerUrl}
                  title={`${movie.title || movie.name} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  onLoad={() => setIsLoading(false)}
                />
              </>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
                }}
              >
                <div className="bg-black/60 p-4 rounded-lg text-white text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <p>Trailer not available</p>
                </div>
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="p-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              {movie.title || movie.name}
            </h2>
            
            <div className="flex items-center space-x-4 mb-4 text-gray-300">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
              </div>
              <span>{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
              <span className="border border-gray-400 px-2 py-1 text-xs rounded">HD</span>
              <span className="border border-gray-400 px-2 py-1 text-xs rounded">
                {movie.mediaType === 'tv' ? 'TV Series' : 'Movie'}
              </span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {movie.overview}
            </p>

            {/* Action buttons */}
            <div className="flex space-x-4">
              <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Play
              </button>
              <button className="bg-gray-700 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600 transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },

  // Loading Spinner Component
  LoadingSpinner: () => (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
    </div>
  )
};

export default Components;