const { getUser } = require("../repositories/authRepositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authValidation } = require("../validations/authValidation");

exports.login = async (req, res) => {
  try {
    const data = await authValidation.parse(req.body);
    const user = await getUser(data.email);

    if (!user) throw { message: "Usuario não existe!" };
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          password: user.password,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30min",
        }
      );
      return res.status(200).send({ token });
    }

    {
      res.status(401).send({ message: "Usuario e/ou senha incorretos!" });
    }
  } catch (error) {
    res.status(400).send(err);
  }
};
