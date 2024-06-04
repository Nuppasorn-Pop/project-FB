const express = require("express");
const upload = require("../middleware/upload");
const postController = require("../controller/post-controller");
const postRouter = express.Router();
postRouter.post("/", upload.single("image"), postController.createPost);
module.exports = postRouter;
