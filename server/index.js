const express = require("express");
const app = express();
const getInfoRouter = require("./src/routes/getInfo");
const filterRouter = require("./src/routes/filters");
const corsMiddleware = require("./src/middleware/cors");

app.use(express.json());
app.use(corsMiddleware);
app.use("/getInfo", getInfoRouter);
app.use("/filters", filterRouter);

app.listen(5000, () => {
  console.log("server is up!");
});
