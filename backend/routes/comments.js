const express = require("express");
const router = express.Router();
const authorizeUser = require("../middleware/authorizeUser");
const commentController = require("../controllers/commentController");

router.post("/", authorizeUser, commentController.create);

module.exports = router;
