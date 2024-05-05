const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authorizeUser = require("../middleware/authorizeUser");
const checkUser = require("../middleware/checkUser");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        cb(
            null,
            file.originalname.split(".")[0] +
                "-" +
                Date.now() +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000000 },
});

router.get("/", postController.list);
router.get("/hot", postController.hot);
router.get("/:id", checkUser, postController.find);
router.post("/", authorizeUser, upload.single("image"), postController.create);
router.post("/rate/:id/:action", authorizeUser, postController.rate);
router.post("/report/:id", authorizeUser, postController.report);

module.exports = router;
