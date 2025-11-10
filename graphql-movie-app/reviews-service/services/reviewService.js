const reviewsData = require("../data/reviewsData");

exports.getAllReviews = () => {
  return reviewsData;
};

exports.getReviewById = (id) => {
  return reviewsData.find((r) => r.id === id);
};

exports.createReview = (reviewInput) => {
  if (!reviewInput.movieId || !reviewInput.userId || !reviewInput.text) {
    throw new Error("Missing required review fields: movieId, userId, text");
  }

  const newReview = {
    id: reviewsData.length + 1,
    ...reviewInput,
  };

  reviewsData.push(newReview);
  return newReview;
};

exports.deleteReview = (id) => {
  const index = reviewsData.findIndex((r) => r.id === id);
  if (index !== -1) {
    reviewsData.splice(index, 1);
    return true;
  }
  return false;
};

exports.updateReview = (id, reviewInput) => {
  const review = reviewsData.find((r) => r.id === id);
  if (!review) {
    throw new Error("Review not found");
  }
  Object.assign(review, reviewInput);
  return review;
};
