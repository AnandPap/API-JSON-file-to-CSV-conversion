async function downloadCsvFileOnClick() {
  const movieIDs = await fetchMovieIDs(1000);
  const movies = await fetchMovieDetails(movieIDs);
  const csvData = formCsvData(movies);
  downloadCsvFile(csvData, "top_rate_movies.csv");
}

document.getElementById("download-csv-button").addEventListener("click", downloadCsvFileOnClick);
