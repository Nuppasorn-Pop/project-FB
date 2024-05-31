const express = require("express");
const relationshipController = require("../controller/relationship-controller");
const relationshipRouter = express.Router();

relationshipRouter.post(
  "/users/:receiverId",
  relationshipController.requirdFriend
);
module.exports = relationshipRouter;
