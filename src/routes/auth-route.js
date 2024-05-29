const express = require("express");
const authController = require("../controller/auth-controller");
const {
  registerValidator,
  loginValidator,
} = require("../middleware/validator");
const authenticate = require("../middleware/authenticate");

const authRouter = express.Router();

authRouter.post("/register", registerValidator, authController.register);
authRouter.post("/login", loginValidator, authController.login);
authRouter.get("/me", authenticate, authController.getMe);

module.exports = authRouter;
