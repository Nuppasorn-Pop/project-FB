const authController = {};

authController.register = (req, res, next) => {
  res.status(201).json(req.body);
};

module.exports = authController;
