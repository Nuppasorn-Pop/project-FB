const prisma = require("../models/prisma");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");

const postController = {};

postController.createPost = async (req, res, next) => {
  console.log("message----------------------", req.body);
  try {
    if (!req.file && !req.body.message) {
      createError({
        message: "message or image is required",
        statusCode: 400,
      });
    }

    const data = {
      userId: req.user.id,
      message: req.body.message,
    };

    if (req.file) {
      data.image = await uploadService.upload(req.file.path);
    }
    console.log("data-----------------------", data);
    await prisma.post.create({
      data,
    });

    res.status(201).json({ message: "post has been created" });
  } catch (error) {
    next(error);
  }
};
module.exports = postController;
