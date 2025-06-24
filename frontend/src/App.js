import React, { useState, useEffect } from 'react';
import './App.css';
import Components from './Components';

// TMDB API Configuration
const API_KEY = 'c8dea14dc917687ac631a52620e4f7ad';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchPopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchPopularTVShows: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`
};

function App() {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    Header,
    Hero,
    MovieRow,
    MovieModal,
    LoadingSpinner
  } = Components;

  // Fetch movies data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          trending,
          netflixOriginals,
          topRated,
          action,
          comedy,
          horror,
          romance,
          documentaries,
          popularMovies,
          popularTV
        ] = await Promise.all([
          fetch(requests.fetchTrending).then(res => res.json()),
          fetch(requests.fetchNetflixOriginals).then(res => res.json()),
          fetch(requests.fetchTopRated).then(res => res.json()),
          fetch(requests.fetchActionMovies).then(res => res.json()),
          fetch(requests.fetchComedyMovies).then(res => res.json()),
          fetch(requests.fetchHorrorMovies).then(res => res.json()),
          fetch(requests.fetchRomanceMovies).then(res => res.json()),
          fetch(requests.fetchDocumentaries).then(res => res.json()),
          fetch(requests.fetchPopularMovies).then(res => res.json()),
          fetch(requests.fetchPopularTVShows).then(res => res.json())
        ]);

        setMovies({
          trending: trending.results,
          netflixOriginals: netflixOriginals.results,
          topRated: topRated.results,
          action: action.results,
          comedy: comedy.results,
          horror: horror.results,
          romance: romance.results,
          documentaries: documentaries.results,
          popularMovies: popularMovies.results,
          popularTV: popularTV.results
        });

        // Set featured movie from trending
        if (trending.results && trending.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, trending.results.length));
          setFeaturedMovie(trending.results[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data if API fails
        setMovies({
          trending: mockMovies,
          netflixOriginals: mockMovies.slice(0, 8),
          topRated: mockMovies.slice(2, 10),
          action: mockMovies.slice(1, 9),
          comedy: mockMovies.slice(3, 11),
          horror: mockMovies.slice(0, 7),
          romance: mockMovies.slice(4, 12),
          documentaries: mockMovies.slice(1, 8),
          popularMovies: mockMovies.slice(0, 10),
          popularTV: mockMovies.slice(2, 12)
        });
        setFeaturedMovie(mockMovies[0]);
      }
    };

    fetchData();
  }, []);

  // Search functionality
  const handleSearch = async (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  // Get trailer for a movie
  const getTrailer = async (movieId, mediaType = 'movie') => {
    try {
      const response = await fetch(
        `${BASE_URL}/${mediaType}/${movieId}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      const trailer = data.results?.find(video => 
        video.type === 'Trailer' && video.site === 'YouTube'
      );
      return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1` : null;
    } catch (error) {
      console.error('Error fetching trailer:', error);
      return null;
    }
  };

  const handleMovieClick = async (movie) => {
    const mediaType = movie.first_air_date ? 'tv' : 'movie';
    const trailerUrl = await getTrailer(movie.id, mediaType);
    setSelectedMovie({ ...movie, trailerUrl, mediaType });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  // Mock data fallback
  const mockMovies = [
    {
      id: 1,
      title: "Stranger Things",
      name: "Stranger Things",
      overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.",
      poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      vote_average: 8.7,
      release_date: "2016-07-15",
      first_air_date: "2016-07-15"
    },
    {
      id: 2,
      title: "The Witcher",
      name: "The Witcher",
      overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world.",
      poster_path: "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
      backdrop_path: "/3KZ2WAEMiJ3PVnL8hJxTdlMq6qT.jpg",
      vote_average: 8.2,
      release_date: "2019-12-20",
      first_air_date: "2019-12-20"
    }
  ];

  if (!movies.trending && !featuredMovie) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app bg-black min-h-screen text-white">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      
      {searchQuery && isSearching && (
        <div className="px-4 py-8">
          <LoadingSpinner />
        </div>
      )}
      
      {searchQuery && !isSearching && searchResults.length > 0 && (
        <div className="px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.slice(0, 18).map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={movie.poster_path ? 
                    `${IMAGE_BASE_URL}${movie.poster_path}` : 
                    'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title || movie.name}
                  className="w-full rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                <p className="text-sm mt-2 truncate">{movie.title || movie.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!searchQuery && (
        <>
          {featuredMovie && (
            <Hero 
              movie={featuredMovie} 
              onPlayClick={() => handleMovieClick(featuredMovie)}
            />
          )}
          
          <div className="px-4 pb-8 space-y-8">
            {movies.trending && (
              <MovieRow 
                title="Trending Now" 
                movies={movies.trending} 
                onMovieClick={handleMovieClick}
              />
            )}
            {movies.netflixOriginals && (
              <MovieRow 
                title="Netflix Originals" 
                movies={movies.netflixOriginals} 
                onMovieClick={handleMovieClick}
                isLarge
              />
            )}
            {movies.popularMovies && (
              <MovieRow 
                title="Popular Movies" 
                movies={movies.popularMovies} 
                onMovieClick={handleMovieClick}
              />
            )}
            {movies.popularTV && (
              <MovieRow 
                title="Popular TV Shows" 
                movies={movies.popularTV} 
                onMovieClick={handleMovieClick}
              />
            )}
            {movies.topRated && (
              <MovieRow 
                title="Top Rated" 
                movies={movies.topRated} 
                onMovieClick={handleMovieClick}
              />
            )}
            {movies.action && (
              <MovieRow 
                title="Action Movies" 
                movies={movies.action} 
                onMovieClick={handleMovieClick}
              />
            )}
            {movies.comedy && (
              <MovieRow 
                title="Comedy Movies" 
                movies={movies.comedy} 
                onMovieClick={handleMovieClick}
              />
            )}
            {movies.horror && (
              <MovieRow 
                title="Horror Movies" 
                movies={movies.horror} 
                onMovieClick={handleMovieClick}
              />
            )}
            {movies.romance && (
              <MovieRow 
                title="Romance Movies" 
                movies={movies.romance} 
                onMovieClick={handleMovieClick}
              />
            )}
            {movies.documentaries && (
              <MovieRow 
                title="Documentaries" 
                movies={movies.documentaries} 
                onMovieClick={handleMovieClick}
              />
            )}
          </div>
        </>
      )}
      
      {showModal && selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;