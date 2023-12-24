require("dotenv").config();
require("./db/conn");
const router = require("./Routes/router");

const express = require("express");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 4002;

// middleware
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server start at Port No :${PORT}`);
});
