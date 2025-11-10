const reviewService = require("../services/reviewService");

exports.getAllReviews = (req, res) => {
  /*
    #swagger.tags = ['Reviews']
    #swagger.responses[200] = {
      description: 'List of all reviews',
      schema: { $ref: '#/definitions/GetReview' }
    }
  */
  const reviews = reviewService.getAllReviews();
  res.json(reviews);
};

exports.getReviewById = (req, res) => {
  /*
    #swagger.tags = ['Reviews']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Review ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Review found',
      schema: { $ref: '#/definitions/GetReview' }
    }
    #swagger.responses[404] = { description: 'Review not found' }
  */
  const reviewId = parseInt(req.params.id);
  const review = reviewService.getReviewById(reviewId);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: "Review not found" });
  }
};

exports.createReview = (req, res) => {
  /*
    #swagger.tags = ['Reviews']
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'New review object',
      required: true,
      schema: { $ref: '#/definitions/CreateReview' }
    }
    #swagger.responses[201] = {
      description: 'Review created successfully',
      schema: { $ref: '#/definitions/GetReview' }
    }
    #swagger.responses[400] = { description: 'Missing required review fields' }
  */
  try {
    const newReview = reviewService.createReview(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReview = (req, res) => {
  /*
    #swagger.tags = ['Reviews']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Review ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[204] = { description: 'Review deleted successfully' }
    #swagger.responses[404] = { description: 'Review not found' }
  */
  const reviewId = parseInt(req.params.id);
  const deleted = reviewService.deleteReview(reviewId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Review not found" });
  }
};

exports.updateReview = (req, res) => {
  /*
    #swagger.tags = ['Reviews']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Review ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated review object',
      required: true,
      schema: { $ref: '#/definitions/UpdateReview' }
    }
    #swagger.responses[200] = {
      description: 'Review updated successfully',
      schema: { $ref: '#/definitions/GetReview' }
    }
    #swagger.responses[404] = { description: 'Review not found' }
  */
  const reviewId = parseInt(req.params.id);
  try {
    const updatedReview = reviewService.updateReview(reviewId, req.body);
    res.json(updatedReview);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};