const {
  createUser,
  getUser,
  getUserId,
  updateUser,
  removeUser,
} = require("../repositories/userRepositorie");

const bcrypt = require("bcrypt");

//Tratamento de usuario
exports.create = async (req, res) => {
  try {
    const data = req.body;
    let obj = { ...data };
    obj.password = bcrypt.hashSync(req.body.password, 10);
    const user = await createUser(obj);
    res.status(200).send(user);
  } catch (error) {
    res
      .status(400)
      .send(error)
      .json({ message: "Ocorreu um erro ao criar o usuário!" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const user = await getUser();
    res.status(200).send(user);
  } catch (error) {
    res
      .status(400)
      .send(error)
      .json({ message: "Ocorreu um erro ao pegar todos os usuários!" });
  }
};

exports.getID = async (req, res) => {
  try {
    const user = await getUserId(Number(req.params.id));
    res.status(200).send(user);
  } catch (error) {
    res
      .status(400)
      .send(error)
      .json({ message: "Ocorreu um erro ao pegar o usuário!" });
  }
};

exports.update = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await updateUser(Number(req.params.id), req.body);
    res.status(200).send(user);
  } catch (error) {
    res
      .status(400)
      .send(error)
      .json({ message: "Ocorreu um erro ao atualizar os dados!" });
  }
};

exports.remove = async (req, res) => {
  try {
    await removeUser(Number(req.params.id));
    res.status(200).send();
  } catch (error) {
    res
      .status(400)
      .send(error)
      .json({ message: "Ocorreu um erro ao deletar o usuario!" });
  }
};
