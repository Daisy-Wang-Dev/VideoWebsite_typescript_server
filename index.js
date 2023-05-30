require("dotenv").config();
const express=require("express");
const app = express();
const PORT = process.env.PORT || 4040;
const cors = require("cors");

app.use(cors());

app.listen(PORT, () => {
    console.log("Server has started on port " + PORT);
  });

