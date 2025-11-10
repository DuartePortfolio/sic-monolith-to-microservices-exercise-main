const movieService = require("../services/movieService");

exports.getAllMovies = (req, res) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.responses[200] = {
      description: 'List of all movies',
      schema: { $ref: '#/definitions/GetMovie' }
    }
  */
  const movies = movieService.getAllMovies();
  res.json(movies);
};

exports.getMovieById = async (req, res) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Movie ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Movie found',
      schema: { $ref: '#/definitions/GetMovie' }
    }
    #swagger.responses[404] = { description: 'Movie not found' }
    #swagger.responses[500] = { description: 'Failed to fetch movie details' }
  */
  const movieId = parseInt(req.params.id);
  try {
    const movieWithReviews = await movieService.getMovieById(movieId);
    if (!movieWithReviews) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movieWithReviews);
  } catch (err) {
    console.error("Error fetching movie:", err);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
};

exports.createMovie = (req, res) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'New movie object',
      required: true,
      schema: { $ref: '#/definitions/CreateMovie' }
    }
    #swagger.responses[201] = {
      description: 'Movie created successfully',
      schema: { $ref: '#/definitions/GetMovie' }
    }
  */
  const { title, year } = req.body;
  const newMovie = movieService.createMovie(title, year);
  res.status(201).json(newMovie);
};

exports.updateMovie = async (req, res) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Movie ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated movie object',
      required: true,
      schema: { $ref: '#/definitions/UpdateMovie' }
    }
    #swagger.responses[200] = {
      description: 'Movie updated successfully',
      schema: { $ref: '#/definitions/GetMovie' }
    }
    #swagger.responses[404] = { description: 'Movie not found' }
    #swagger.responses[500] = { description: 'Failed to update movie' }
  */
  const movieId = parseInt(req.params.id);
  const movieData = { id: movieId, ...req.body };
  try {
    const updatedMovie = await movieService.updateMovie(movieData);
    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(updatedMovie);
  } catch (err) {
    console.error("Error updating movie:", err);
    res.status(500).json({ error: "Failed to update movie" });
  }
};

exports.deleteMovie = async (req, res) => {
  /*
    #swagger.tags = ['Movies']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Movie ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Movie deleted successfully',
      schema: { $ref: '#/definitions/GetMovie' }
    }
    #swagger.responses[404] = { description: 'Movie not found' }
    #swagger.responses[500] = { description: 'Failed to delete movie' }
  */
  const movieId = parseInt(req.params.id);
  try {
    const deletedMovie = await movieService.deleteMovie(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(deletedMovie);
  } catch (err) {
    console.error("Error deleting movie:", err);
    res.status(500).json({ error: "Failed to delete movie" });
  }
};