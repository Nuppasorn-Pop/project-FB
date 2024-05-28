const prisma = require("../models/prisma");
const userServicr = {};

userServicr.createUser = (data) => prisma.user.create({ data });
userServicr.findUserByEmailOrMobile = (emailOrMobile) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    },
  });

module.exports = userServicr;
