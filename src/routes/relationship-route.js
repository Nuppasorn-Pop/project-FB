const express = require("express");
const relationshipController = require("../controller/relationship-controller");
const relationshipRouter = express.Router();

relationshipRouter.post(
  "/users/:receiverId",
  relationshipController.requirdFriend
);

relationshipRouter.delete(
  "/users/:receiverId/cancel",
  relationshipController.cancelRequest
);

relationshipRouter.patch(
  "/users/:senderId",
  relationshipController.confirmRequest
);

relationshipRouter.delete(
  "/users/:senderId/reject",
  relationshipController.rejectRequest
);

relationshipRouter.delete(
  "/users/:targetUserId/unfriend",
  relationshipController.unfirend
);
module.exports = relationshipRouter;
