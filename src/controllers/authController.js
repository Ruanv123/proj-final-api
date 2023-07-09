/* eslint-disable no-undef */
const { getUser, getUserById } = require("../repositories/authRepositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authValidation } = require("../validations/authValidation");

exports.login = async (req, res) => {
  try {
    const data = await authValidation.parse(req.body);
    const user = await getUser(data.email);

    if (!user) {
      return res.status(401).send({ message: 'Usuário não existe!' })
    };

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
     const token = generateAccessToken(user.id, user.email, user.name)
     const refreshToken = generateRefreshToken(user.id)

      return res.status(200).send({ token, refreshToken});
    }
    {
      res.status(401).send({ message: "Usuario e/ou senha incorretos!" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken

  if(!refreshToken) {
    return res.status(401).send({message: 'Token de Atualizacao Invalido!'})
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
    const user = await getUserById(decoded.id)

    if(!user) {
      return res.status(401).send({message: 'Usuario nao autorizado!'})
    }
    const token = generateAccessToken(user.id, user.email, user.name)
    const newRefreshToken = generateRefreshToken(user.id)

    return res.status(200).send({token, refreshToken: newRefreshToken})
  } catch (error) {
    return res.status(400).send({ message: 'Token de atualização inválido!' + error })
  }
}

function generateAccessToken(id, email, name) {
  return jwt.sign(
    {
      id,
      email,
      name,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: '15min',
    },
  )
}

function generateRefreshToken(id) {
  return jwt.sign(
    {
      id,
    },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: '7d',
    },
  )
}