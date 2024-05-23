// Change for your own API if needed. As it is, it is used for fetching from TMDB API
const tmdbBaseURL = "https://api.themoviedb.org/3/movie/";

// Meant as a measure against overloading rate limit on TMDB site (currently, it sits at 50 requests per second range)
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchMovieIDs(amount = 1000) {
  const ids = [];

  for (let pageNumber = 1; pageNumber < amount / 20 + 1; pageNumber++) {
    let data = await fetch(tmdbBaseURL + `top_rated?page=${pageNumber}&api_key=` + process.env.API_KEY);
    data = await data.json();
    const res = data.results;
    for (let j = 0; j < res.length; j++) res[j].id ? ids.push(res[j].id) : null;
    if (pageNumber !== 0 && pageNumber % 45 === 0) await delay(500);
  }

  return ids;
}

async function fetchMovieDetails(movieIDs) {
  const movies = [];

  for (let movieIndex = 0; movieIndex < movieIDs.length; movieIndex++) {
    let data = await fetch(tmdbBaseURL + `${movieIDs[movieIndex]}?api_key=` + process.env.API_KEY);
    const res = await data.json();
    movies.push({
      title: '"' + (res.title || res.original_title) + '"',
      belongs_to_collection: '"' + (res.belongs_to_collection?.name ?? "None") + '"',
      release_year: res.release_date?.slice(0, 4) || "N/A",
      runtime: res.runtime || 0,
      R_rated: res.adult ? "Yes" : "No",
      origin_country: res.origin_country[0] || "N/A",
      language: res.original_language || "N/A",
      genres: (function () {
        let genres = [];
        for (let j = 0; j < res.genres.length; j++) {
          const genre = res.genres[j];
          genres.push(genre.name);
        }
        return genres.join("/");
      })(),
      // status: res.status || "N/A",
      popularity: res.popularity || 0,
      vote_count: res.vote_count || 0,
      vote_average: res.vote_average || 0,
      production_company: '"' + (res.production_companies[0]?.name || "N/A") + '"',
      production_country: res.production_countries[0]?.name || "N/A",
      budget: res.budget || 0,
      revenue: res.revenue || 0,
      spoken_language: res.spoken_languages[0]?.name || "N/A",
    });
    if (movieIndex !== 0 && movieIndex % 45 === 0) await delay(500);
  }

  return movies;
}
