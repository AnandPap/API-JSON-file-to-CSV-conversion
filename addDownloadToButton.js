async function downloadCsvFileOnClick() {
  // Number of movies to fetch
  const movieIDs = await fetchMovieIDs(1000);
  const movies = await fetchMovieDetails(movieIDs);
  const csvData = formCsvData(movies);
  // File name is sent as a second argument to a function
  downloadCsvFile(csvData, "top_rate_movies.csv");
}

document.getElementById("download-csv-button").addEventListener("click", downloadCsvFileOnClick);
