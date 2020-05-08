const express = require("express");
const app = express();
const getInfoRouter = require("./src/routes/getInfo");
const corsMiddleware = require("./src/middleware/cors");

app.use(express.json());
app.use(corsMiddleware);
app.use("/getInfo", getInfoRouter);

app.listen(5000, () => {
  console.log("server is up!");
});
