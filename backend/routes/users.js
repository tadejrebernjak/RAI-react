const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authorizeUser = require("../middleware/authorizeUser");

router.get("/token", authorizeUser, userController.token);
router.post("/", userController.register);
router.post("/login", userController.login);

module.exports = router;
