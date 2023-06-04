const { login } = require("../controllers/authController");

exports.authRoutes = (app) => {
  app.post("/login", login);
};
