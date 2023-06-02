require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4040;
const videoRoute = require("./routes/videos");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/videos", videoRoute);

app.listen(PORT, () => {
  console.log("Server has started on port " + PORT);
});
