const express = require("express");
const authController = require("../controller/auth-controller");
const { registerValidator } = require("../middleware/validator");

const authRouter = express.Router();

authRouter.post("/register", registerValidator, authController.register);
module.exports = authRouter;
