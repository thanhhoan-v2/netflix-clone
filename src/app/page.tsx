"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieModal from "@/components/MovieModal";
import MovieRow from "@/components/MovieRow";
import { useEffect, useState } from "react";

// TMDB API Configuration
const API_KEY = "c8dea14dc917687ac631a52620e4f7ad"; // It's generally better to store API keys in environment variables
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

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
	fetchPopularTVShows: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
};

type Movie = {
	id: number;
	title?: string;
	name?: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	vote_average?: number;
	release_date?: string;
	first_air_date?: string;
	trailerUrl?: string | null;
	mediaType?: "movie" | "tv";
};

type Movies = {
	trending: Movie[];
	netflixOriginals: Movie[];
	topRated: Movie[];
	action: Movie[];
	comedy: Movie[];
	horror: Movie[];
	romance: Movie[];
	documentaries: Movie[];
	popularMovies: Movie[];
	popularTV: Movie[];
};

export default function Home() {
	const [movies, setMovies] = useState<Movies | null>(null);
	const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Movie[]>([]);
	const [isSearching, setIsSearching] = useState(false);

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
					popularTV,
				] = await Promise.all([
					fetch(requests.fetchTrending).then((res) => res.json()),
					fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
					fetch(requests.fetchTopRated).then((res) => res.json()),
					fetch(requests.fetchActionMovies).then((res) => res.json()),
					fetch(requests.fetchComedyMovies).then((res) => res.json()),
					fetch(requests.fetchHorrorMovies).then((res) => res.json()),
					fetch(requests.fetchRomanceMovies).then((res) => res.json()),
					fetch(requests.fetchDocumentaries).then((res) => res.json()),
					fetch(requests.fetchPopularMovies).then((res) => res.json()),
					fetch(requests.fetchPopularTVShows).then((res) => res.json()),
				]);

				const allMovies = {
					trending: trending.results,
					netflixOriginals: netflixOriginals.results,
					topRated: topRated.results,
					action: action.results,
					comedy: comedy.results,
					horror: horror.results,
					romance: romance.results,
					documentaries: documentaries.results,
					popularMovies: popularMovies.results,
					popularTV: popularTV.results,
				};
				setMovies(allMovies);

				// Set featured movie from trending
				if (trending.results && trending.results.length > 0) {
					const randomIndex = Math.floor(
						Math.random() * Math.min(5, trending.results.length),
					);
					setFeaturedMovie(trending.results[randomIndex]);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Search functionality
	const handleSearch = async (query: string) => {
		if (query.trim() === "") {
			setSearchResults([]);
			setIsSearching(false);
			return;
		}

		setIsSearching(true);
		try {
			const response = await fetch(
				`${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`,
			);
			const data = await response.json();
			setSearchResults(data.results || []);
		} catch (error) {
			console.error("Search error:", error);
			setSearchResults([]);
		} finally {
			setIsSearching(false);
		}
	};

	// Get trailer for a movie
	const getTrailer = async (
		movieId: number,
		mediaType: "movie" | "tv" = "movie",
	) => {
		type Video = {
			type: string;
			site: string;
			key: string;
		};
		try {
			const response = await fetch(
				`${BASE_URL}/${mediaType}/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
			);
			const data = await response.json();
			const trailer = data.results?.find(
				(video: Video) => video.type === "Trailer" && video.site === "YouTube",
			);
			return trailer
				? `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
				: null;
		} catch (error) {
			console.error("Error fetching trailer:", error);
			return null;
		}
	};

	const handleMovieClick = async (movie: Movie) => {
		const mediaType = movie.first_air_date ? "tv" : "movie";
		const trailerUrl = await getTrailer(movie.id, mediaType);
		setSelectedMovie({ ...movie, trailerUrl, mediaType });
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedMovie(null);
	};

	if (!movies && !featuredMovie) {
		return (
			<div className="bg-black min-h-screen">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="bg-black min-h-screen text-white app">
			<Header
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onSearch={handleSearch}
			/>

			{searchQuery && isSearching && (
				<div className="px-4 py-8 pt-24">
					<LoadingSpinner />
				</div>
			)}

			{searchQuery && !isSearching && searchResults.length > 0 && (
				<div className="px-4 py-8 pt-24">
					<h2 className="mb-4 font-bold text-2xl">
						Search Results for "{searchQuery}"
					</h2>
					<div className="gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
						{searchResults.slice(0, 18).map((movie) => (
							<div
								key={movie.id}
								className="hover:scale-105 transition-all duration-300 cursor-pointer transform"
								onClick={() => handleMovieClick(movie)}
								onKeyDown={() => handleMovieClick(movie)}
								role="button"
								tabIndex={0}
							>
								<img
									src={
										`${IMAGE_BASE_URL}${movie.poster_path}` ||
										"https://via.placeholder.com/300x450?text=No+Image"
									}
									alt={movie.title || movie.name || "Movie poster"}
									className="shadow-lg rounded-lg w-full"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/300x450?text=No+Image";
									}}
								/>
								<p className="mt-2 text-sm truncate">
									{movie.title || movie.name}
								</p>
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

					<div className="space-y-8 px-4 pb-8">
						{movies?.trending && (
							<MovieRow
								title="Trending Now"
								movies={movies.trending}
								onMovieClick={handleMovieClick}
							/>
						)}
						{movies?.netflixOriginals && (
							<MovieRow
								title="Netflix Originals"
								movies={movies.netflixOriginals}
								onMovieClick={handleMovieClick}
								isLarge
							/>
						)}
						{movies?.topRated && (
							<MovieRow
								title="Top Rated"
								movies={movies.topRated}
								onMovieClick={handleMovieClick}
							/>
						)}
						{movies?.action && (
							<MovieRow
								title="Action Movies"
								movies={movies.action}
								onMovieClick={handleMovieClick}
							/>
						)}
						{movies?.comedy && (
							<MovieRow
								title="Comedy Movies"
								movies={movies.comedy}
								onMovieClick={handleMovieClick}
							/>
						)}
						{movies?.horror && (
							<MovieRow
								title="Horror Movies"
								movies={movies.horror}
								onMovieClick={handleMovieClick}
							/>
						)}
						{movies?.romance && (
							<MovieRow
								title="Romance Movies"
								movies={movies.romance}
								onMovieClick={handleMovieClick}
							/>
						)}
						{movies?.documentaries && (
							<MovieRow
								title="Documentaries"
								movies={movies.documentaries}
								onMovieClick={handleMovieClick}
							/>
						)}
						{movies?.popularMovies && (
							<MovieRow
								title="Popular Movies"
								movies={movies.popularMovies}
								onMovieClick={handleMovieClick}
							/>
						)}
						{movies?.popularTV && (
							<MovieRow
								title="Popular TV Shows"
								movies={movies.popularTV}
								onMovieClick={handleMovieClick}
							/>
						)}
					</div>
				</>
			)}

			{showModal && selectedMovie && (
				<MovieModal movie={selectedMovie} onClose={closeModal} />
			)}
		</div>
	);
}
