const notFoundMiddleware = (req, res, next) => {
  res
    .status(404)
    .json({
      message: `requestd url: ${req.method} ${req.url} was not founed on this server`,
    });
};

module.exports = notFoundMiddleware;
