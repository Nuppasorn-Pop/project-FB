const prisma = require("../models/prisma");
const {
  RELATIONSHIP_STATUS,
  RELATIONSHIP_TO_AUTH_USER,
} = require("../constants/index");
const relationshipService = {};

// id:1, id:2
// SELECT * FROM relationship WHERE (senderId = 1 AND recevier = 2) OR (senderId = 2 AND recevier = 1)
relationshipService.findUserARelationToUserB = async (userAId, userBId) => {
  if (userAId === userBId) {
    return RELATIONSHIP_TO_AUTH_USER.ME;
  }
  const existRelationShip = await prisma.relationship.findFirst({
    where: {
      OR: [
        { senderId: userAId, receiverId: userBId },
        { senderId: userBId, receiverId: userAId },
      ],
    },
  });

  if (!existRelationShip) {
    return RELATIONSHIP_TO_AUTH_USER.UNKNOWN;
  }

  if (existRelationShip.status === RELATIONSHIP_STATUS.ACCEPTED) {
    return RELATIONSHIP_TO_AUTH_USER.FRIEND;
  }

  if (existRelationShip.senderId === userAId) {
    return RELATIONSHIP_TO_AUTH_USER.SENDER;
  }

  return RELATIONSHIP_TO_AUTH_USER.RECEVIER;
};

relationshipService.findRelationshipBetweenUserAAndUserB = (userAId, userBId) =>
  prisma.relationship.findFirst({
    where: {
      OR: [
        { senderId: userAId, receiverId: userBId },
        { senderId: userBId, receiverId: userAId },
      ],
    },
  });

relationshipService.createRelationship = (senderId, receiverId) =>
  prisma.relationship.create({
    data: {
      senderId,
      receiverId,
      status: RELATIONSHIP_STATUS.PENDING,
    },
  });

relationshipService.deleteRalationshipBySenderIdRecevierIdAndStatus = (
  senderId,
  receiverId,
  status
) =>
  prisma.relationship.deleteMany({
    where: { senderId, receiverId, status },
  });

relationshipService.findBySenderIdRecevierIdAndStatus = (
  senderId,
  receiverId,
  status
) =>
  prisma.relationship.findFirst({
    where: { senderId, receiverId, status },
  });

relationshipService.updateRelationshipById = (status, id) =>
  prisma.relationship.updateMany({ data: { status }, where: { id } });

relationshipService.deleteRelationshipById = (id) =>
  prisma.relationship.delete({ where: { id } });

module.exports = relationshipService;
