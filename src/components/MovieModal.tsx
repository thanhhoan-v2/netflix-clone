"use client";

import type React from "react";

// Define the type for a movie object
type Movie = {
	id: number;
	title?: string;
	name?: string;
	overview: string;
	release_date?: string;
	first_air_date?: string;
	vote_average?: number;
	trailerUrl?: string | null;
	mediaType?: "movie" | "tv";
};

type MovieModalProps = {
	movie: Movie | null;
	onClose: () => void;
};

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
	if (!movie) {
		return null;
	}

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	return (
		<div
			className="z-50 fixed inset-0 flex justify-center items-center bg-black/80"
			onClick={handleBackdropClick}
			onKeyDown={handleKeyDown}
			role="dialog"
			aria-modal="true"
			tabIndex={-1}
		>
			<div className="relative bg-black shadow-2xl rounded-lg w-full max-w-4xl overflow-hidden animate-fade-in">
				<button
					onClick={onClose}
					className="top-2 right-2 z-10 absolute bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
					type="button"
					aria-label="Close"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
						<title>Close</title>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>

				<div className="relative pb-[56.25%]">
					{" "}
					{/* 16:9 aspect ratio */}
					{movie.trailerUrl ? (
						<iframe
							src={movie.trailerUrl}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="top-0 left-0 absolute w-full h-full"
						/>
					) : (
						<div className="top-0 left-0 absolute flex justify-center items-center bg-black w-full h-full">
							<p className="text-white text-xl">Trailer not available</p>
						</div>
					)}
				</div>

				<div className="p-8">
					<h2 className="mb-2 font-bold text-3xl">
						{movie.title || movie.name}
					</h2>
					<div className="flex items-center space-x-4 mb-4 text-gray-400 text-sm">
						<span className="font-semibold text-green-400">
							{movie.vote_average?.toFixed(1)} Rating
						</span>
						<span>
							{new Date(
								movie.release_date || movie.first_air_date || "",
							).getFullYear()}
						</span>
						<span>{movie.mediaType === "tv" ? "TV Series" : "Movie"}</span>
					</div>
					<p className="text-gray-300 leading-relaxed">{movie.overview}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieModal;
