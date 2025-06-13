const express = require("express");
const cors = require("cors");
const dataRoute = require('./src/routes/dataRoute');
const deleteRoute = require('./src/routes/deleteRoute');
const { ROUTES } = require("./src/config/constants");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(ROUTES.DATA, dataRoute);
app.use(ROUTES.DELETE, deleteRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);