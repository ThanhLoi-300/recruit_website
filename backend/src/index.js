const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors'); 
dotenv.config();

const app = express();
// Sử dụng cors middleware
const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000']
}

app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.json())
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
//
app.use(
  express.urlencoded({
      extended : true,
  })
);
const port = process.env.PORT || 3001;
console.log("DB:  ",process.env.MONGO_DB);
mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connect DB success");
  })
  .catch((err) => {
    console.log("abc",err);
  });

routes(app)

app.listen(port, () => {
  console.log("Server is running at " + port);
});
