const { authRoutes } = require("./authRoute");
const { userRoutes } = require("./userRoute");

module.exports = (app) => {
  userRoutes(app);
  authRoutes(app);
};
