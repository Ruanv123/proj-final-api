const {
  create,
  getAll,
  getID,
  update,
  remove,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

exports.userRoutes = (app) => {
  //rota de criar usuario
  app.post("/user", create);
  //rota de chamar todos usuários
  app.get("/user",verifyToken,  getAll);
  //rota de pegar usuario por id
  app.get("/user/:id", verifyToken, getID);
  //rota de atualizar usuario
  app.put("/user/:id", verifyToken, update);
  //deletar usuario
  app.delete("/user/:id", verifyToken, remove);
};
