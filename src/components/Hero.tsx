import type React from "react";

// Define the type for a movie object
type Movie = {
	id: number;
	title?: string;
	name?: string;
	overview: string;
	backdrop_path: string;
	release_date?: string;
	first_air_date?: string;
	vote_average?: number;
};

type HeroProps = {
	movie: Movie | null;
	onPlayClick: () => void;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Hero: React.FC<HeroProps> = ({ movie, onPlayClick }) => {
	const truncateString = (str: string | undefined, num: number) => {
		if (!str) return "";
		if (str.length <= num) return str;
		return `${str.slice(0, num)}...`;
	};

	if (!movie) {
		return null; // Or a loading skeleton
	}

	return (
		<div className="relative h-screen">
			{/* Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-no-repeat bg-center"
				style={{
					backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
				<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
			</div>

			{/* Content */}
			<div className="absolute inset-0 flex items-center">
				<div className="px-4 md:px-8 max-w-2xl">
					<h1 className="mb-4 font-bold text-white text-4xl md:text-6xl">
						{movie.title || movie.name}
					</h1>
					<p className="mb-6 text-gray-200 text-lg md:text-xl leading-relaxed">
						{truncateString(movie.overview, 200)}
					</p>

					{/* Buttons */}
					<div className="flex space-x-4">
						<button
							onClick={onPlayClick}
							className="flex items-center bg-white hover:bg-gray-200 px-8 py-3 rounded font-semibold text-black transition-colors duration-200"
							type="button"
						>
							<svg
								className="mr-2 w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<title>Play</title>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
									clipRule="evenodd"
								/>
							</svg>
							Play
						</button>
						<button
							className="flex items-center bg-gray-500/70 hover:bg-gray-500/90 px-8 py-3 rounded font-semibold text-white transition-colors duration-200"
							type="button"
						>
							<svg
								className="mr-2 w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<title>More Info</title>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
							More Info
						</button>
					</div>

					{/* Rating and year */}
					<div className="flex items-center space-x-4 mt-6 text-gray-300">
						<div className="flex items-center">
							<svg
								className="mr-1 w-5 h-5 text-yellow-400"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<title>Rating</title>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<span>{movie.vote_average?.toFixed(1)}</span>
						</div>
						<span>
							{new Date(
								movie.release_date || movie.first_air_date || "",
							).getFullYear()}
						</span>
						<span className="px-2 py-1 border border-gray-400 rounded text-xs">
							HD
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
