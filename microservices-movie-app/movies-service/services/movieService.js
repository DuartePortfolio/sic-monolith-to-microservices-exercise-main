const moviesData = require("../data/moviesData");
const reviewClient = require("../utils/reviewClient");

exports.getAllMovies = () => {
  return moviesData;
};

exports.getMovieById = async (movieId) => {
  const movie = moviesData.find((m) => m.id === movieId);
  if (!movie) return null;

  const allReviews = await reviewClient.fetchAllReviews();
  const movieReviews = allReviews.filter((r) => r.movieId === movie.id);

  return {
    ...movie,
    reviews: movieReviews
  };
};

exports.createMovie = (title, year) => {
  const newMovie = { id: moviesData.length + 1, title, year };
  moviesData.push(newMovie);
  return newMovie;
};


exports.updateMovie = async (movieData) => {
  const movie = moviesData.find((m) => m.id === movieData.id);
  if (!movie) return null;

  Object.assign(movie, movieData);
  return {
    ...movie
  };
};

exports.deleteMovie = async (movieId) => {
  const movie = moviesData.find((m) => m.id === movieId);
  if (!movie) return null;

  const index = moviesData.indexOf(movie);
  moviesData.splice(index, 1);

  return {
    ...movie
  };
};