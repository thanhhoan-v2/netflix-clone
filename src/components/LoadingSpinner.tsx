const LoadingSpinner = () => {
	return (
		<div className="flex justify-center items-center h-full">
			<div className="border-t-2 border-red-600 border-b-2 rounded-full w-32 h-32 animate-spin" />
		</div>
	);
};

export default LoadingSpinner;
