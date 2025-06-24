import type React from "react";
import { useEffect, useState } from "react";

type HeaderProps = {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	onSearch: (query: string) => void;
};

const Header: React.FC<HeaderProps> = ({
	searchQuery,
	setSearchQuery,
	onSearch,
}) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [showSearch, setShowSearch] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);
		onSearch(value);
	};

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-500 ${
				isScrolled
					? "bg-black"
					: "bg-gradient-to-b from-black/80 to-transparent"
			}`}
		>
			<div className="flex justify-between items-center px-4 md:px-8 py-4">
				{/* Logo */}
				<div className="flex items-center space-x-8">
					<div className="font-bold text-red-600 text-2xl md:text-3xl cursor-pointer">
						NETFLIX
					</div>
					<nav className="hidden md:flex space-x-6">
						<a
							href="/"
							className="text-white hover:text-gray-300 transition-colors"
						>
							Home
						</a>
						<a
							href="/"
							className="text-white hover:text-gray-300 transition-colors"
						>
							TV Shows
						</a>
						<a
							href="/"
							className="text-white hover:text-gray-300 transition-colors"
						>
							Movies
						</a>
						<a
							href="/"
							className="text-white hover:text-gray-300 transition-colors"
						>
							New & Popular
						</a>
						<a
							href="/"
							className="text-white hover:text-gray-300 transition-colors"
						>
							My List
						</a>
					</nav>
				</div>

				{/* Right side */}
				<div className="flex items-center space-x-4">
					{/* Search */}
					<div className="relative">
						{showSearch ? (
							<div className="flex items-center bg-black px-3 py-1 border border-white rounded">
								<svg
									className="mr-2 w-5 h-5 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<title>Search Icon</title>
									<path
										fillRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clipRule="evenodd"
									/>
								</svg>
								<input
									type="text"
									placeholder="Search movies, TV shows..."
									value={searchQuery}
									onChange={handleSearchChange}
									className="bg-transparent outline-none w-48 text-white placeholder-gray-400"
									onBlur={() => !searchQuery && setShowSearch(false)}
								/>
							</div>
						) : (
							<button
								onClick={() => setShowSearch(true)}
								className="text-white hover:text-gray-300 transition-colors"
								type="button"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<title>Search Icon</title>
									<path
										fillRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						)}
					</div>

					{/* Notifications */}
					<button
						className="text-white hover:text-gray-300 transition-colors"
						type="button"
					>
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
							<title>Notifications</title>
							<path d="M10 2C6.686 2 4 4.686 4 8v2.17c0 .357-.096.707-.268 1.018L2.456 13.83a1 1 0 00.824 1.549h2.95A2.5 2.5 0 006 17c0 .828.672 1.5 1.5 1.5h5c.828 0 1.5-.672 1.5-1.5a2.5 2.5 0 00-.23-1.621h2.95a1 1 0 00.824-1.549l-1.276-2.642A2.17 2.17 0 0116 10.17V8c0-3.314-2.686-6-6-6z" />
						</svg>
					</button>

					{/* Profile */}
					<div className="flex justify-center items-center bg-red-600 rounded w-8 h-8 font-semibold text-white cursor-pointer">
						U
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
