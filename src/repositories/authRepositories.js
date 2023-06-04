const { prisma } = require("../services/prisma");

exports.getUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return user;
};
