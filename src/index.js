const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const SwaggerDocument = require("./swagger.json");

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerDocument));

require("./routes/index.js")(app);

app.listen(process.env.PORT, () => {
  console.log(`server rodando na porta ${process.env.PORT}`);
});
