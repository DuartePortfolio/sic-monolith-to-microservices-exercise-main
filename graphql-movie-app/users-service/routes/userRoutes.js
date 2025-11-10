const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticator = require("../middleware/authenticator");

// public routes
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

// protected routes
router.get("/", authenticator.authenticateToken, authenticator.authorizeRole("admin"), userController.getAllUsers);

// only allow the authenticated user to access their own resource
router.get("/:id", authenticator.authenticateToken, authenticator.authorizeSelf, userController.getUserById);
router.delete("/:id", authenticator.authenticateToken, authenticator.authorizeSelf, userController.deleteUser);
router.put("/:id", authenticator.authenticateToken, authenticator.authorizeSelf, userController.updateUser);

module.exports = router;