const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Routes
router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/", reviewController.createReview);
router.delete("/:id", reviewController.deleteReview);
router.put("/:id", reviewController.updateReview);

module.exports = router;
