const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

require("./routes/index")(app);

app.listen(process.env.PORT, () => {
  console.log(`server rodando na porta ${process.env.PORT}`);
});
