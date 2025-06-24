"use client";

import type React from "react";
import { useState } from "react";

// Define the type for a movie object
type Movie = {
	id: number;
	title?: string;
	name?: string;
	poster_path: string;
	vote_average?: number;
};

type MovieRowProps = {
	title: string;
	movies: Movie[];
	onMovieClick: (movie: Movie) => Promise<void> | void;
	isLarge?: boolean;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieRow: React.FC<MovieRowProps> = ({
	title,
	movies,
	onMovieClick,
	isLarge = false,
}) => {
	const [scrollX, setScrollX] = useState(0);

	const slide = (direction: "left" | "right") => {
		const container = document.getElementById(
			`row-${title.replace(/\s+/g, "")}`,
		);
		if (container) {
			const scrollAmount = container.clientWidth * 0.8;

			if (direction === "left") {
				setScrollX((prev) => Math.min(prev + scrollAmount, 0));
			} else {
				const maxScroll = -(container.scrollWidth - container.clientWidth);
				setScrollX((prev) => Math.max(prev - scrollAmount, maxScroll));
			}
		}
	};

	return (
		<div className="movie-row">
			<h2 className="mb-4 px-4 md:px-8 font-semibold text-white text-xl md:text-2xl">
				{title}
			</h2>
			<div className="group relative">
				{/* Left Arrow */}
				<button
					className="top-1/2 left-2 z-10 absolute bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 p-2 rounded-full text-white transition-opacity -translate-y-1/2 duration-300 transform"
					onClick={() => slide("left")}
					type="button"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
						<title>Left</title>
						<path
							fillRule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>

				{/* Movies Container */}
				<div
					id={`row-${title.replace(/\s+/g, "")}`}
					className="flex px-4 md:px-8 overflow-hidden transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(${scrollX}px)` }}
				>
					{movies?.slice(0, 20).map((movie) => (
						<div
							key={movie.id}
							className={`flex-shrink-0 mr-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
								isLarge ? "w-48 md:w-64" : "w-32 md:w-48"
							}`}
							onClick={() => onMovieClick(movie)}
							onKeyDown={() => onMovieClick(movie)}
							role="button"
							tabIndex={0}
						>
							<div className="group/card relative">
								<img
									src={
										movie.poster_path
											? `${IMAGE_BASE_URL}${movie.poster_path}`
											: "https://via.placeholder.com/300x450?text=No+Image"
									}
									alt={movie.title || movie.name || "Movie poster"}
									className="shadow-lg rounded-lg w-full object-cover"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/300x450?text=No+Image";
									}}
								/>

								{/* Hover overlay */}
								<div className="absolute inset-0 flex items-end bg-black/60 opacity-0 group-hover/card:opacity-100 rounded-lg transition-opacity duration-300">
									<div className="p-4 text-white">
										<h3 className="mb-2 font-semibold text-sm line-clamp-2">
											{movie.title || movie.name}
										</h3>
										<div className="flex items-center space-x-2 text-xs">
											<svg
												className="w-4 h-4 text-yellow-400"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<title>Rating</title>
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
					className="top-1/2 right-2 z-10 absolute bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 p-2 rounded-full text-white transition-opacity -translate-y-1/2 duration-300 transform"
					onClick={() => slide("right")}
					type="button"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
						<title>Right</title>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default MovieRow;
