const {
  create,
  getAll,
  getID,
  update,
  remove,
} = require("../controllers/userController");

exports.userRoutes = (app) => {
  //rota de criar usuario
  app.post("/user", create);
  //rota de chamar todos usuários
  app.get("/user", getAll);
  //rota de pegar usuario por id
  app.get("/user/:id", getID);
  //rota de atualizar usuario
  app.put("/user/:id", update);
  //deletar usuario
  app.delete("/user/:id", remove);
};
