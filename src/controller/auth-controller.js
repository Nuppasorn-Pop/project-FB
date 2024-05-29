const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    // 1. validate
    // 1.1. check user by email or mobile
    const existUser = await userService.findUserByEmailOrMobile(
      data.email || data.mobile
    );
    if (existUser) {
      createError({
        message: "Email or Mobile already in use",
        statusCode: 400,
        field: "emailOrMobile",
      });
    }

    // 2. req.input password ==> hash
    data.password = await hashService.hash(data.password);

    // 3. create user ==> validate data to create user
    await userService.createUser(data);
    res.status(201).json({ message: "user created" });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

authController.login = async (req, res, next) => {
  try {
    const existUser = await userService.findUserByEmailOrMobile(
      req.input.emailOrMobile
    );

    if (!existUser) {
      createError({
        message: "Invalid credentials",
        statusCode: 400,
      });
    }

    const isMatch = await hashService.compare(
      req.input.password,
      existUser.password
    );

    if (!isMatch) {
      createError({
        message: "Invalid credentials",
        statusCode: 400,
      });
    }

    const accessToken = jwtService.sign({ id: existUser.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports = authController;
