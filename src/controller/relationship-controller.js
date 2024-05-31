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

module.exports = relationshipController;
