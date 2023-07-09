const { login, refreshToken } = require("../controllers/authController");

exports.authRoutes = (app) => {
  app.post("/auth/login", login);
  app.post("/auth/refresh-token", refreshToken)
};
