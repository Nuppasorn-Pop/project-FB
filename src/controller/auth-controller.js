const hashService = require("../services/hash-service");
const userServicr = require("../services/user-service");
const createError = require("../utils/create-error");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    // 1. validate
    // 1.1. check user by email or mobile
    const existUser = await userServicr.findUserByEmailOrMobile(
      data.email || data.mobile
    );
    if (existUser) {
      createError({
        message: "Email or Mobile already in use",
        statusCode: 400,
      });
    }

    // 2. req.input password ==> hash
    data.password = await hashService.hash(data.password);

    // 3. create user ==> validate data to create user
    await userServicr.createUser(data);
    res.status(201).json({ message: "user created" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authController;
