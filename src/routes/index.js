const { userRoutes } = require("./userRoute");

module.exports = (app) => {
  userRoutes(app);
};
