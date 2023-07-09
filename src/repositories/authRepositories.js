const { prisma } = require("../services/prisma");

exports.getUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

exports.getUserById = async id => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  })
  return user
}