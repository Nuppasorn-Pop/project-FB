const { RELATIONSHIP_STATUS } = require("../constants");
const prisma = require("../models/prisma");
const relationshipService = require("../services/relationship-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const relationshipController = {};
relationshipController.requirdFriend = async (req, res, next) => {
  try {
    if (+req.params.receiverId === req.user.id) {
      createError({
        message: "sender Id and recevier Id must be different",
        statusCode: 400,
      });
    }

    // แอดเพื่อน เช็คว่ามี user ที่จะแอดไหม
    const existUser = await userService.findUserById(+req.params.receiverId);
    if (!existUser) {
      createError({
        message: "user was not found",
        statusCode: 400,
      });
    }

    // แอดเพื่อน เช็ค Relationship
    const existRelationship =
      await relationshipService.findRelationshipBetweenUserAAndUserB(
        +req.params.receiverId,
        req.user.id
      );
    if (existRelationship) {
      createError({
        message: "already have relationship",
        statusCode: 400,
      });
    }

    // แอดเพื่อน ==> ความสัมพันธ์เป็นเพื่อนกัน
    await relationshipService.createRelationship(
      req.user.id,
      +req.params.receiverId
    );
    res.status(200).json("request has been sent");
  } catch (err) {
    next(err);
  }
};

relationshipController.cancelRequest = async (req, res, next) => {
  try {
    const existRelationship =
      await relationshipService.findRelationshipBetweenUserAAndUserB(
        req.user.id,
        +req.params.receiverId
      );
    if (!existRelationship) {
      createError({
        message: "relationship not exist",
        status: 400,
      });

      if (
        existRelationship.senderId !== req.user.id &&
        existRelationship.status !== RELATIONSHIP_STATUS.PENDING
      ) {
        createError({
          message: "this user cannot cancel this requesr",
          status: 400,
        });
      }
    }

    await relationshipService.deleteRalationshipBySenderIdRecevierIdAndStatus(
      req.user.id,
      +req.params.receiverId,
      RELATIONSHIP_STATUS.PENDING
    );

    res.status(204).json("relationship terminated"); // status => no content
  } catch (err) {
    next(err);
  }
};

relationshipController.confirmRequest = async (req, res, next) => {
  try {
    const existRelationship =
      await relationshipService.findBySenderIdRecevierIdAndStatus(
        +req.params.senderId,
        req.user.id,
        RELATIONSHIP_STATUS.PENDING
      );

    if (!existRelationship) {
      createError({
        message: "relationship did not exist",
        statusCode: 400,
      });
    }

    await relationshipService.updateRelationshipById(
      RELATIONSHIP_STATUS.ACCEPTED,
      existRelationship.id
    );
    res.status(200).json({ message: "request accepted" });
  } catch (error) {
    next(error);
  }
};

relationshipController.rejectRequest = async (req, res, next) => {
  try {
    const existRelationShip =
      await relationshipService.findBySenderIdRecevierIdAndStatus(
        +req.params.senderId,
        req.user.id,
        RELATIONSHIP_STATUS.PENDING
      );
    if (!existRelationShip) {
      createError({
        message: "relation did not exist",
        statusCode: 400,
      });
    }
    await relationshipService.deleteRelationshipById(existRelationShip.id);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
};

relationshipController.unfirend = async (req, res, next) => {
  try {
    const existRelationShip =
      await relationshipService.findRelationshipBetweenUserAAndUserB(
        +req.params.targetUserId,
        req.user.id
      );
    if (
      !existRelationShip ||
      existRelationShip.status !== RELATIONSHIP_STATUS.ACCEPTED
    ) {
      createError({
        message: "relation did not exist",
        statusCode: 400,
      });
    }
    await relationshipService.deleteRelationshipById(existRelationShip.id);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
};

module.exports = relationshipController;
