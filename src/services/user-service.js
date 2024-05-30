const prisma = require("../models/prisma");
const userService = {};

userService.createUser = (data) => prisma.user.create({ data });
userService.findUserByEmailOrMobile = (emailOrMobile) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    },
  });

// chceck user ที่ login by id
userService.findUserById = (userId) =>
  prisma.user.findUnique({ where: { id: userId } });

// update user by id
userService.updateUserById = (data, userId) =>
  prisma.user.update({ where: { id: userId }, data });

module.exports = userService;
