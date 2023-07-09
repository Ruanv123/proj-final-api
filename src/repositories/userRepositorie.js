const { prisma } = require("../services/prisma");

//funcao de criar usuario
exports.createUser = async (data) => {
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      telefone: true,
      createdAt: true,
      updatedAt: true
    },
  });
  return user;
};

//funcao de selecionar todos os usuarios
exports.getUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      telefone: true,
      avatar: true,
      desc: true,
      createdAt: true,
      updatedAt: true
    },
  });
  return user;
};

//funcao de pegar usuario por id
exports.getUserId = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      telefone: true,
      avatar: true,
      desc: true,
      createdAt: true,
      updatedAt: true
    },
  });
  return user;
};

//funcao de atualizar usuario por id
exports.updateUser = async (id, data) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      telefone: true,
      avatar: true,
      desc: true,
      createdAt: true,
      updatedAt: true
    },
  });
  return user;
};

//funcao de deletar usuario
exports.removeUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};
