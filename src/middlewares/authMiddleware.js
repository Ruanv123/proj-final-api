const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Token é obrigatório" });
  }

  try {
    const replace = token.replace("Bearer ", "");
    const decoded = jwt.verify(replace, process.env.TOKEN_KEY);
    next();
  } catch (err) {
    return res.status(401).send({
      message:
        "Credenciais invalidas, Você precisa estar autenticado para fazer isso!",
    });
  }
};
