const express = require("express");
const dotenv = require("dotenv");

const app = express();

const port = 3001;

app.listen(port, () => {
  console.log("Server is running at " + port);
});
