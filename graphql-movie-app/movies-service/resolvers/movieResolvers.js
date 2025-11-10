const { ApolloError, UserInputError } = require('apollo-server');
const movieService = require('../services/movieService');

const resolvers = {
  Query: {
    movies: async () => {
      try {
        return await movieService.getAllMovies();
      } catch (err) {
        console.error('Failed to get movies:', err);
        throw new ApolloError('Failed to fetch movies', 'MOVIES_FETCH_FAILED');
      }
    },
    movie: async (_, { id }) => {
      try {
        const movie = await movieService.getMovieById(parseInt(id));
        if (!movie) throw new ApolloError('Movie not found', 'NOT_FOUND');
        return movie;
      } catch (err) {
        // If the service threw an error (e.g., reviews fetch failed), map it
        console.error('Error getting movie:', err);
        // If it is already an ApolloError, rethrow
        if (err.extensions && err.extensions.code) throw err;
        // Otherwise, return a generic internal error code
        throw new ApolloError('Failed to fetch movie', 'MOVIE_FETCH_FAILED');
      }
    },
  },

  Mutation: {
    addMovie: async (_, { title, year }) => {
      if (!title || !year) {
        throw new UserInputError('title and year are required', {
          invalidArgs: ['title', 'year'],
        });
      }
      try {
        return await movieService.createMovie(title, year);
      } catch (err) {
        console.error('Failed to create movie:', err);
        throw new ApolloError('Create movie failed', 'CREATE_MOVIE_FAILED');
      }
    },

    updateMovie: async (_, { id, title, year }) => {
      if (!id) throw new UserInputError('id is required', { invalidArgs: ['id'] });

      const movieData = { id: parseInt(id) };
      if (title !== undefined) movieData.title = title;
      if (year !== undefined) movieData.year = year;

      try {
        const updated = await movieService.updateMovie(movieData);
        if (!updated) throw new ApolloError('Movie not found', 'NOT_FOUND');
        return updated;
      } catch (err) {
        console.error('Failed to update movie:', err);
        // if underlying service indicates external dependency problem, set code accordingly
        if (err.message && err.message.includes('reviews')) {
          throw new ApolloError('Failed to update movie due to reviews fetch', 'DEPENDENCY_FAILED');
        }
        throw new ApolloError('Update movie failed', 'UPDATE_MOVIE_FAILED');
      }
    },

    deleteMovie: async (_, { id }) => {
      try {
        const deleted = await movieService.deleteMovie(parseInt(id));
        if (!deleted) throw new ApolloError('Movie not found', 'NOT_FOUND');
        return deleted;
      } catch (err) {
        console.error('Failed to delete movie:', err);
        throw new ApolloError('Delete movie failed', 'DELETE_MOVIE_FAILED');
      }
    },
  },
};

module.exports = resolvers;